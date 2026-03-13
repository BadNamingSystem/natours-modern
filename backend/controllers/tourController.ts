import { Request, Response, NextFunction } from "express"
import prisma from "../utils/db.js"
import { Tour } from "@prisma/client"
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js"
import { slugify } from "../utils/helpers.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"

export const getAllTours = getAll<Tour>(prisma.tour)
export const getTour = getOne<Tour>(prisma.tour, {
    guides: {
        select: {
            id: true,
            name: true,
            photo: true,
            role: true,
        },
    },
    reviews: {
        select: {
            id: true,
            review: true,
            rating: true,
        },
    },
})
export const createTour = createOne<Tour>(prisma.tour)
export const updateTour = updateOne<Tour>(prisma.tour)
export const deleteTour = deleteOne<Tour>(prisma.tour)

export const getTourBySlug = catchAsync(async (req, res, next) => {
    const tour = await prisma.tour.findUnique({
        where: { slug: req.params.slug as string },
        include: { reviews: true, guides: true },
    })

    if (!tour) return next(new AppError("No tour found with that name", 404))

    res.status(200).json({ status: "success", data: tour })
})

export const setTourSlug = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }
    next()
}

export const aliasTopTours = (req: Request, res: Response, next: NextFunction) => {
    // Set query parameters for top 5 tours
    const aliasQuery = {
        ...req.query,
        limit: "5",
        sort: "-ratingsAverage,price",
        fields: "name,price,ratingsAverage,summary,difficulty",
    }
    // Override the query object with the alias query
    Object.defineProperty(req, "query", {
        value: aliasQuery,
        writable: true,
        configurable: true,
    })
    next()
}
