import express from "express"
import {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    checkReviewOwnership,
} from "../controllers/reviewController.js"
import { validate } from "../middleware/validate.js"
import { createReviewSchema, updateReviewSchema } from "../schemas/reviewSchema.js"
import { protect, restrictTo } from "../middleware/authMiddleware.js"

// Merge params to allow access to tourId from parent route
const router = express.Router({ mergeParams: true })

router.use(protect)

router.route("/").get(getAllReviews).post(restrictTo("user"), validate(createReviewSchema), createReview)

router
    .route("/:id")
    .get(getReview)
    .patch(restrictTo("user", "admin"), checkReviewOwnership, validate(updateReviewSchema), updateReview)
    .delete(restrictTo("user", "admin"), checkReviewOwnership, deleteReview)

export default router
