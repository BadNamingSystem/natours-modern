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

const router = express.Router()

// TOUR ALIAS ROUTE (MIDDLEWARE)
router.route("/top-5-tours").get(aliasTopTours, getAllTours)

// TOUR STATS ROUTE - Aggregation
router.route("/tour-stats").get(getTourStats)
router.route("/monthly-plan/:year").get(getMonthlyPlan)

// GEOSPATIAL ROUTES
router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(getToursWithin)
router.route("/distances/:latlng/unit/:unit").get(getDistances)

// TOUR CRUD ROUTES
router.route("/").get(getAllTours).post(validate(tourSchema), createTour)
router.route("/:id").get(getTour).patch(validate(tourUpdateSchema), updateTour).delete(deleteTour)

export default router
