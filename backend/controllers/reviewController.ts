import { Request, Response, NextFunction } from "express"
import { Review } from "@prisma/client"
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js"
import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"

export const getAllReviews = getAll<Review>(prisma.review)
export const getReview = getOne<Review>(prisma.review)
export const createReview = createOne<Review>(prisma.review)
export const updateReview = updateOne<Review>(prisma.review)
export const deleteReview = deleteOne<Review>(prisma.review)

// Runs before update or delete review
// Checks if the user is the owner of the review
export const checkReviewOwnership = catchAsync(async (req, res, next) => {
    const { id } = req.params as { id: string }

    const review = await prisma.review.findUnique({
        where: { id },
    })

    if (!review) {
        return next(new AppError("No review found with that ID", 404))
    }

    // Check ownership (admins can bypass)
    if (review.userId !== req.user!.id && req.user!.role !== "admin") {
        return next(new AppError("You do not have permission to perform this action", 403))
    }

    next()
})

// Runs before create review
// Sets the tour and user IDs in the request body
export const setTourUserIds = (req: Request, res: Response, next: NextFunction) => {
    // Force the tourId from the URL (nested routes) or allow it from body
    if (!req.body.tourId) req.body.tourId = req.params.tourId as string
    if (!req.body.userId) req.body.userId = req.user?.id

    next()
}
