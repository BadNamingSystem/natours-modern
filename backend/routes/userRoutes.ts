import express from "express"
import {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getMe,
    updateMe,
    deleteMe,
} from "../controllers/userController.js"
import { signup, login, logout, updatePassword, forgotPassword, resetPassword } from "../controllers/authController.js"
import { validate } from "../middleware/validate.js"
import {
    signupSchema,
    loginSchema,
    updatePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../schemas/userSchema.js"
import { protect, restrictTo } from "../middleware/authMiddleware.js"

const router = express.Router()

// Auth routes
router.post("/signup", validate(signupSchema), signup)
router.post("/login", validate(loginSchema), login)
router.get("/logout", logout)

// Password reset routes
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword)
router.patch("/reset-password/:token", validate(resetPasswordSchema), resetPassword)

// PROTECTED ROUTES - Needs authentication
router.use(protect)

// Password update route
router.patch("/update-password", validate(updatePasswordSchema), updatePassword)

// User info routes
router.get("/me", getMe, getUser)
router.patch("/update-me", updateMe)
router.delete("/delete-me", deleteMe)

// RESTRICTED ROUTES - Admin only
router.use(restrictTo("admin"))

// User routes
router.route("/").get(getAllUsers)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

export default router
