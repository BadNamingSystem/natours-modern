import { Request, Response, NextFunction } from "express"
import prisma from "../utils/db.js"
import { Tour } from "@prisma/client"
import { getAll, getOne, createOne, updateOne, deleteOne } from "./handlerFactory.js"
import { slugify } from "../utils/helpers.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
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

export const uploadTourImages = upload.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 3 },
])

export const resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files || Array.isArray(req.files) || !req.files.imageCover || !req.files.images) return next()

    const files = req.files

    // 1) Resize imageCover
    const imageCoverFilename = `tour-${req.params.id}-${Date.now()}-cover.jpeg`

    await sharp(files.imageCover[0].buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${imageCoverFilename}`)

    req.body.imageCover = imageCoverFilename

    // 2) Resize images
    req.body.images = []

    await Promise.all(
        files.images.map(async (file, index) => {
            const filename = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`

            await sharp(file.buffer)
                .resize(2000, 1333)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/tours/${filename}`)

            req.body.images.push(filename)
        }),
    )

    next()
})

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
        include: {
            user: {
                select: {
                    name: true,
                    photo: true,
                },
            },
        },
    },
})
export const createTour = createOne<Tour>(prisma.tour)
export const updateTour = updateOne<Tour>(prisma.tour)
export const deleteTour = deleteOne<Tour>(prisma.tour)

export const getTourBySlug = catchAsync(async (req, res, next) => {
    const tour = await prisma.tour.findUnique({
        where: { slug: req.params.slug as string },
        include: {
            reviews: {
                include: {
                    user: {
                        select: {
                            name: true,
                            photo: true,
                        },
                    },
                },
            },
            guides: true,
        },
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
