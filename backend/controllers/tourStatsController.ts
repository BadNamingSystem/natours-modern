import prisma from "../utils/db.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"

export const getTourStats = catchAsync(async (req, res, next) => {
    // 1. Core aggregation using groupBy
    const stats = await prisma.tour.groupBy({
        by: ["difficulty"], // Group by difficulty
        where: {
            ratingsAverage: {
                // Filter tours with ratingsAverage >= 4.5
                gte: 4.5,
            },
        },
        _count: {
            // Count all documents in each group
            _all: true,
        },
        _sum: {
            // Sum ratingsQuantity for each group
            ratingsQuantity: true,
        },
        _avg: {
            // Calculate average ratingsAverage and price for each group
            ratingsAverage: true,
            price: true,
        },
        _min: {
            // Find minimum price for each group
            price: true,
        },
        _max: {
            // Find maximum price for each group
            price: true,
        },
    })

    // 2. Formatting the result to match the desired structure
    const formattedStats = stats
        .map(stat => ({
            difficulty: stat.difficulty.toUpperCase(),
            numTours: stat._count._all,
            numRatings: stat._sum.ratingsQuantity,
            avgRating: stat._avg.ratingsAverage,
            avgPrice: stat._avg.price,
            minPrice: stat._min.price,
            maxPrice: stat._max.price,
        }))
        .sort((a, b) => b.numTours - a.numTours)

    res.status(200).json({
        status: "success",
        data: {
            formattedStats,
        },
    })
})

export const getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = Number(req.params.year)

    // 1. Fetch tours (only name and startDates)
    const tours = await prisma.tour.findMany({
        select: {
            name: true,
            startDates: true,
        },
    })

    // 1. Flatten the tours and dates into a single list of "starts"
    const allStartDates = tours.flatMap(tour =>
        tour.startDates.map(dateStr => ({
            name: tour.name,
            date: new Date(dateStr),
        })),
    )

    // 2. Filter and Group in a single pass using reduce
    const planMap = allStartDates
        .filter(start => start.date.getFullYear() === year)
        .reduce(
            (acc, start) => {
                const month = start.date.getMonth() + 1
                acc[month] = acc[month] || { numTourStarts: 0, tours: [] }
                acc[month].numTourStarts++
                acc[month].tours.push(start.name)
                return acc
            },
            {} as Record<number, { numTourStarts: number; tours: string[] }>,
        )

    // 3. Format and sort
    const plan = Object.entries(planMap)
        .map(([month, data]) => ({
            month: Number(month),
            ...data,
        }))
        .sort((a, b) => a.month - b.month)

    res.status(200).json({
        status: "success",
        data: {
            plan,
        },
    })
})

export const getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params as { latlng: string; unit: string }
    const [lat, lng] = latlng.split(",").map((val: string) => val.trim())

    if (!lat || !lng) {
        return next(new AppError("Please provide latitude and longitude in the format lat,lng", 400))
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    const multiplier = unit === "mi" ? 0.000621371 : 0.001

    if (isNaN(latitude) || isNaN(longitude)) {
        return next(new AppError("Invalid latitude or longitude", 400))
    }

    const distances = await prisma.$queryRaw<any[]>`
        SELECT 
            name, 
            ST_DistanceSphere(
                ST_SetSRID(ST_MakePoint(${longitude}::double precision, ${latitude}::double precision), 4326),
                ST_SetSRID(ST_MakePoint(
                    CAST(("startLocation"->'coordinates'->>0) AS double precision),
                    CAST(("startLocation"->'coordinates'->>1) AS double precision)
                ), 4326)
            ) * ${multiplier} as distance
        FROM tours
        ORDER BY distance ASC
    `

    res.status(200).json({
        status: "success",
        results: distances.length,
        data: {
            distances,
        },
    })
})

export const getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params as { distance: string; latlng: string; unit: string }
    const [lat, lng] = latlng.split(",").map((val: string) => val.trim())

    if (!lat || !lng) {
        return next(new AppError("Please provide latitude and longitude in the format lat,lng", 400))
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    const distanceVal = parseFloat(distance)

    if (isNaN(latitude) || isNaN(longitude) || isNaN(distanceVal)) {
        return next(new AppError("Invalid latitude, longitude, or distance", 400))
    }

    // Convert distance to meters (ST_DistanceSphere returns meters)
    const distanceInMeters = unit === "mi" ? distanceVal / 0.000621371 : distanceVal / 0.001

    const tours = await prisma.$queryRaw<any[]>`
        SELECT * FROM tours
        WHERE ST_DistanceSphere(
            ST_SetSRID(ST_MakePoint(${longitude}::double precision, ${latitude}::double precision), 4326),
            ST_SetSRID(ST_MakePoint(
                CAST(("startLocation"->'coordinates'->>0) AS double precision),
                CAST(("startLocation"->'coordinates'->>1) AS double precision)
            ), 4326)
        ) <= ${distanceInMeters}
    `

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours,
        },
    })
})
