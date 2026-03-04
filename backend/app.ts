import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import tourRouter from "./routes/tourRoutes.js"
import userRouter from "./routes/userRoutes.js"
import AppError from "./utils/appError.js"
import { globalErrorHandler } from "./controllers/errorController.js"

const app = express()

app.set("query parser", "extended")
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// ROUTES
app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

// Unhandled routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global error handler
app.use(globalErrorHandler)

export default app
