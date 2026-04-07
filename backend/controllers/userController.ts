import { NextFunction, Request, Response } from "express"
import prisma from "../utils/db.js"
import { getAll, getOne, updateOne, deleteOne } from "./handlerFactory.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { filterObj } from "../utils/helpers.js"
import { User } from "@prisma/client"

// Middleware to get currently logged in user for /me route
export const getMe = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user!.id
    next()
}

// Update currently logged in user's name and email (not password)
export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("This route is not for password updates. Please use /update-password.", 400))
    }

    if (!req.user!.canModify) {
        return next(new AppError("You cannot update this account", 403))
    }

    // 2) Filter out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email")

    // 3) Update user document
    const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: filteredBody,
    })

    res.status(200).json({
        status: "success",
        data: { user: updatedUser },
    })
})

// Soft delete. User is not deleted from the database, but marked as inactive.
export const deleteMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await prisma.user.update({
        where: { id: req.user!.id },
        data: { active: false },
    })

    res.status(204).json({
        status: "success",
        data: null,
    })
})

// Admin only (CRUD)
export const getAllUsers = getAll<User>(prisma.user)
export const getUser = getOne<User>(prisma.user)
export const updateUser = updateOne<User>(prisma.user) // not for passwords
export const deleteUser = deleteOne<User>(prisma.user)
