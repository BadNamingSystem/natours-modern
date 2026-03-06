import express from "express"
import {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    aliasTopTours,
} from "../controllers/tourController.js"
import { getTourStats, getMonthlyPlan, getDistances, getToursWithin } from "../controllers/tourStatsController.js"
import { validate } from "../middleware/validate.js"
import { tourSchema, tourUpdateSchema } from "../schemas/tourSchema.js"
import { protect, restrictTo } from "../middleware/authMiddleware.js"
import reviewRouter from "./reviewRoutes.js"

const router = express.Router()

// NESTED ROUTES
router.use("/:tourId/reviews", reviewRouter)

// TOUR ALIAS ROUTE (MIDDLEWARE)
router.route("/top-5-tours").get(aliasTopTours, getAllTours)

// TOUR STATS ROUTE - Aggregation
router.route("/tour-stats").get(getTourStats)
router.route("/monthly-plan/:year").get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan)

// GEOSPATIAL ROUTES
router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin)
router.route("/distances/:latlng/unit/:unit").get(getDistances)

// TOUR CRUD ROUTES
router.route("/").get(getAllTours).post(protect, restrictTo("admin", "lead-guide"), validate(tourSchema), createTour)
router
    .route("/:id")
    .get(getTour)
    .patch(protect, restrictTo("admin", "lead-guide"), validate(tourUpdateSchema), updateTour)
    .delete(protect, restrictTo("admin"), deleteTour)

export default router
