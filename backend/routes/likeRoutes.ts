import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getTourLikeStatus, likeTour, unlikeTour } from "../controllers/likeController.js"

const router = express.Router({ mergeParams: true })

router.use(protect)

router.get("/", getTourLikeStatus)
router.post("/", likeTour)
router.delete("/", unlikeTour)

export default router
