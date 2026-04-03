import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Response, Request, NextFunction, CookieOptions } from "express"
import { User } from "@prisma/client"
import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { exclude } from "../utils/helpers.js"
import crypto from "crypto"
import sendEmail from "../utils/email.js"

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    })
}

const createSendToken = (user: User, statusCode: number, req: Request, res: Response) => {
    const token = signToken(user.id)
    // Fallback to 90 days if env variable is missing or invalid
    const cookieExpiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "90", 10)

    const cookieOptions: CookieOptions = {
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,

        // For production, set sameSite to "none" and secure to true
        // because the frontend is served from a different domain than the backend and using HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" || req.secure || req.get("x-forwarded-proto") === "https",
    }

    // safely exclude password from response
    const userWithoutPassword = exclude(user, ["password"])

    res.cookie("jwt", token, cookieOptions)

    res.status(statusCode).json({
        status: "success",
        token,
        data: { user: userWithoutPassword },
    })
}

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body

    // 1) Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // 2) Create user in database
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    // 3) Send token to client
    createSendToken(newUser, 201, req, res)
})

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400))
    }

    // 2) Check if user exists and password is correct
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password)) || !user.active) {
        return next(new AppError("Incorrect email or password, or account is disabled.", 401))
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res)
})

export const logout = catchAsync(async (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({ status: "success" })
})

// Update password. Only for logged in users checked by 'protect' middleware
export const updatePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, password, passwordConfirm } = req.body

    if (!currentPassword || !password || !passwordConfirm) {
        return next(new AppError("Please provide current password, new password, and confirmation", 400))
    }

    // 1) Get user from request (provided by protect middleware)
    const user = req.user!

    // 2) Check if current password is correct using bcrypt
    if (!(await bcrypt.compare(currentPassword, user.password))) {
        return next(new AppError("The current password you provided is incorrect.", 401))
    }

    // 3) Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // 4) Update password and passwordChangedAt
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            passwordChangedAt: new Date(Date.now() - 1000), // Minor offset for safety
        },
    })

    // 5) Log user in, send JWT
    createSendToken(updatedUser, 200, req, res)
})

export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    if (!email) {
        return next(new AppError("Please provide the email you registered with", 400))
    }

    // 1. Get user based on posted email
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.active) {
        return next(new AppError("There is no active user registered with the provided email address", 401))
    }

    // 2. Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    // Hash token to be stored in db and add expiration date
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // 3. Save reset token and expiration date to user account
    await prisma.user.update({ where: { id: user.id }, data: { passwordResetToken, passwordResetExpires } })

    // 4. Send it to the user's email
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`

    const message = `
    Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
    If you didn't forget your password, please ignore this email!`

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 minutes)",
            message,
        })

        res.status(200).json({ status: "success", message: "Token sent to email" })
    } catch (err) {
        console.error(err)
        // In case or error 'remove' the reset token and expiration date
        await prisma.user.update({
            where: { id: user.id },
            data: { passwordResetToken: null, passwordResetExpires: null },
        })
        return next(new AppError("There was an error sending the email. Please try again!", 500))
    }
})

export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params
    const { password, passwordConfirm } = req.body

    if (!password || !passwordConfirm) {
        return next(new AppError("Please provide your new password", 400))
    }

    // 1. Get the user based on the reset token and expiry
    const hashedToken = crypto
        .createHash("sha256")
        .update(token as string)
        .digest("hex")

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                gt: new Date(),
            },
        },
    })

    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400))
    }

    // 2. Hash new password and update user
    const hashedPassword = await bcrypt.hash(password, 12)

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null,
            passwordChangedAt: new Date(Date.now() - 1000),
        },
    })

    createSendToken(updatedUser, 200, req, res)
})
