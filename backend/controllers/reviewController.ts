import { Review } from "@prisma/client"
import { getAll, getOne } from "./handlerFactory.js"
import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { isValidId } from "../utils/helpers.js"

export const getAllReviews = getAll<Review>(prisma.review)
export const getReview = getOne<Review>(prisma.review)

// Recalculates and persists ratingsQuantity and ratingsAverage for a tour
const calcAverageRatings = async (tourId: string) => {
    const result = await prisma.review.aggregate({
        where: { tourId },
        _avg: { rating: true },
        _count: { rating: true },
    })

    await prisma.tour.update({
        where: { id: tourId },
        data: {
            ratingsQuantity: result._count.rating,
            ratingsAverage: Math.round((result._avg.rating ?? 0) * 10) / 10,
        },
    })
}

export const createReview = catchAsync(async (req, res, next) => {
    // tourId and userId come from trusted server sources, not req.body
    // validate middleware strips unknown fields from req.body
    const tourId = (req.params.tourId as string) || req.body.tourId
    const userId = req.user!.id

    const review = await prisma.review.create({
        data: { ...req.body, tourId, userId },
    })

    await calcAverageRatings(review.tourId)
    res.status(201).json({ status: "success", data: review })
})

export const updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params as { id: string }

    if (!isValidId(id)) {
        return next(new AppError(`ID: ${id} has invalid format.`, 400))
    }

    const review = await prisma.review.update({ where: { id }, data: req.body })

    if (!review) {
        return next(new AppError(`No review found with ID ${id}`, 404))
    }

    await calcAverageRatings(review.tourId)
    res.status(200).json({ status: "success", data: review })
})

export const deleteReview = catchAsync(async (req, res, next) => {
    const { id } = req.params as { id: string }

    if (!isValidId(id)) {
        return next(new AppError(`ID: ${id} has invalid format.`, 400))
    }

    // Grab tourId before deleting — it won't exist afterward
    const review = await prisma.review.findUnique({ where: { id } })

    if (!review) {
        return next(new AppError(`No review found with ID ${id}`, 404))
    }

    await prisma.review.delete({ where: { id } })
    await calcAverageRatings(review.tourId)

    res.status(204).json({ status: "success", data: null })
})

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
