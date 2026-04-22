import { promisify } from "util"
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import prisma from "../utils/db.js"

export const protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token: string | undefined
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token || token === "loggedout") {
        return next(new AppError("You are not logged in! Please log in to get access.", 401))
    }

    // 2) Verify token
    const decoded = (await (promisify(jwt.verify) as any)(token, process.env.JWT_SECRET!)) as {
        id: string
        iat: number
    }

    // 3) Check if user still exists
    const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!currentUser || !currentUser.active) {
        return next(new AppError("The user belonging to this token no longer exists or is inactive.", 401))
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.passwordChangedAt) {
        const changedTimestamp = Math.floor(currentUser.passwordChangedAt.getTime() / 1000)
        // Token was issued BEFORE the password change
        if (decoded.iat < changedTimestamp) {
            return next(new AppError("User recently changed password! Please log in again.", 401))
        }
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    next()
})

export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403))
        }
        next()
    }
}
