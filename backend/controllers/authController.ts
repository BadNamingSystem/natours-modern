import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Response, Request, NextFunction } from "express"
import { User } from "@prisma/client"
import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { exclude } from "../utils/helpers.js"

const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    })
}

const createSendToken = (user: User, statusCode: number, res: Response) => {
    const token = signToken(user.id)
    // Fallback to 90 days if env variable is missing or invalid
    const cookieExpiresIn = parseInt(process.env.JWT_COOKIE_EXPIRES_IN || "90", 10)

    const cookieOptions: any = {
        expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict",
    }

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true

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
    createSendToken(newUser, 201, res)
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
    createSendToken(user, 200, res)
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
    createSendToken(updatedUser, 200, res)
})
