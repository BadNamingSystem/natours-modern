import { NextFunction, Request, Response } from "express"
import fs from "fs/promises"
import prisma from "../utils/db.js"
import { getAll, getOne, updateOne, deleteOne } from "./handlerFactory.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { filterObj } from "../utils/helpers.js"
import { User } from "@prisma/client"
import multer, { FileFilterCallback } from "multer"
import sharp from "sharp"

const multerStorage = multer.memoryStorage()

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400))
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

export const uploadUserPhoto = upload.single("photo")

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    req.file.filename = `user-${req.user!.id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`)

    next()
})

// Middleware to get currently logged in user for /me route
export const getMe = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.user!.id
    next()
}

// Update currently logged in user's name and email (not password)
export const updateMe = catchAsync(async (req, res, next) => {
    // 1) Error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError("This route is not for password updates. Please use /update-password.", 400))
    }

    if (!req.user!.canModify) {
        return next(new AppError("You cannot update this account", 403))
    }

    // 2) Filter out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email")
    if (req.file) {
        filteredBody.photo = req.file.filename

        // Delete the old photo if it's not the default one
        const oldPhoto = req.user?.photo
        if (oldPhoto && oldPhoto !== "default.jpg") {
            const oldPhotoPath = `public/img/users/${oldPhoto}`
            try {
                await fs.unlink(oldPhotoPath)
            } catch (err) {
                console.error(`Error deleting old photo: ${oldPhotoPath}`, err)
            }
        }
    }

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
export const deleteMe = catchAsync(async (req, res, next) => {
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
