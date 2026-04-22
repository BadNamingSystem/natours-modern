import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { isValidId } from "../utils/helpers.js"

type LikeStatus = {
    liked: boolean
    likesCount: number
}

// Helper for counting total likes for one tour and checking whether the current user
// has already liked a tour
const getLikeStatus = async (tourId: string, userId: string): Promise<LikeStatus> => {
    const [likesCount, existingLike] = await Promise.all([
        prisma.like.count({ where: { tourId } }),
        prisma.like.findUnique({
            where: {
                userId_tourId: {
                    userId,
                    tourId,
                },
            },
        }),
    ])

    return {
        liked: Boolean(existingLike),
        likesCount,
    }
}

export const getTourLikeStatus = catchAsync(async (req, res, next) => {
    const { tourId } = req.params as { tourId: string }
    const userId = req.user!.id

    if (!isValidId(tourId)) {
        return next(new AppError(`ID: ${tourId} has invalid format.`, 400))
    }

    const status = await getLikeStatus(tourId, userId)
    res.status(200).json({ status: "success", data: status })
})

export const likeTour = catchAsync(async (req, res, next) => {
    const { tourId } = req.params as { tourId: string }
    const userId = req.user!.id

    if (!isValidId(tourId)) {
        return next(new AppError(`ID: ${tourId} has invalid format.`, 400))
    }

    // Check if a like already exists for the current user/tour pair
    const exists = await prisma.like.findUnique({
        where: {
            userId_tourId: {
                userId,
                tourId,
            },
        },
    })

    // If no like exists, create one
    if (!exists) {
        await prisma.like.create({
            data: {
                userId,
                tourId,
            },
        })
    }

    // Re-calculate the current like state
    const status = await getLikeStatus(tourId, userId)
    res.status(200).json({ status: "success", data: status })
})

export const unlikeTour = catchAsync(async (req, res, next) => {
    const { tourId } = req.params as { tourId: string }
    const userId = req.user!.id

    if (!isValidId(tourId)) {
        return next(new AppError(`ID: ${tourId} has invalid format.`, 400))
    }

    // Find the like for the current user/tour pair
    const exists = await prisma.like.findUnique({
        where: {
            userId_tourId: {
                userId,
                tourId,
            },
        },
    })

    if (!exists) {
        return next(new AppError("Like not found", 404))
    }

    // Delete the row from the table
    await prisma.like.delete({
        where: {
            userId_tourId: {
                userId,
                tourId,
            },
        },
    })

    const status = await getLikeStatus(tourId, userId)
    res.status(200).json({ status: "success", data: status })
})
