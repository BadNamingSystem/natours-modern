import express from "express"
import { protect, restrictTo } from "../middleware/authMiddleware.js"
import {
    createBooking,
    getAllBookings,
    getBooking,
    updateBooking,
    deleteBooking,
    getCheckoutSession,
    getMyBookings,
    checkBookingOwnership,
} from "../controllers/bookingController.js"
import { validate } from "../middleware/validate.js"
import { createBookingSchema, updateBookingSchema } from "../schemas/bookingSchema.js"

const router = express.Router()

router.use(protect)

router.get("/checkout-session/:tourId", getCheckoutSession)
router.get("/my-bookings", getMyBookings)

router.get("/", restrictTo("admin"), getAllBookings)
router.post("/", validate(createBookingSchema), createBooking)
router
    .route("/:id")
    .get(restrictTo("admin"), getBooking)
    .patch(checkBookingOwnership, validate(updateBookingSchema), updateBooking)
    .delete(checkBookingOwnership, deleteBooking)

export default router
