import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import tourRouter from "./routes/tourRoutes.js"
import userRouter from "./routes/userRoutes.js"
import reviewRouter from "./routes/reviewRoutes.js"
import AppError from "./utils/appError.js"
import globalErrorHandler from "./controllers/errorController.js"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import cors from "cors"
import hpp from "hpp"

const app = express()

// Trust first proxy for rate limiting.
app.set("trust proxy", 1)

const port = process.env.PORT || 3000
const allowedOrigins = [process.env.ALLOWED_ORIGIN]

if (process.env.NODE_ENV === "development") {
    allowedOrigins.push(`http://localhost:${port}`)
    allowedOrigins.push("http://localhost:5173")
}
// CORS - Only allow requests from the frontend
app.use(
    cors({
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = "The CORS policy for this site does not allow access from the specified Origin."
                return callback(new Error(msg), false)
            }
            return callback(null, true)
        },
    }),
)

app.set("query parser", "extended")
app.use(express.json({ limit: "10kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(
    hpp({
        whitelist: [
            "duration",
            "maxGroupSize",
            "difficulty",
            "ratingsAverage",
            "ratingsQuantity",
            "price",
            "priceDiscount",
        ],
    }),
)

// ROUTES
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Natours API is live.",
    })
})

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Rate limiting
const limiter = rateLimit({
    max: 1000,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: "Too many requests from this IP, please try again in 15 minutes!",
})
app.use("/api", limiter)

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/reviews", reviewRouter)

// Unhandled routes
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global error handler
app.use(globalErrorHandler)

export default app
