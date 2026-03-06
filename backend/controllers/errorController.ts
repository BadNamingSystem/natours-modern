import AppError from "../utils/appError.js"
import { Request, Response, NextFunction } from "express"
import { Prisma } from "@prisma/client"

type ExtendedError = Error & {
    statusCode?: number
    status?: string
    isOperational?: boolean
    code?: string | number
    detail?: string
    column?: string
    table?: string
    constraint?: string
    path?: string[]
    value?: string
}

const sendErrorDev = (err: ExtendedError, req: Request, res: Response) => {
    res.status(err.statusCode || 500).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorProd = (err: ExtendedError, req: Request, res: Response) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode || 500).json({
            status: err.status,
            message: err.message,
        })
    } else {
        // Programming or other unknown error: don't leak error details
        console.error("ERROR 💥", err)
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        })
    }
}

const handlePrismaDuplicateFields = (err: Prisma.PrismaClientKnownRequestError) => {
    const rawTarget = (err.meta?.target as string[]) || (err.meta as any)?.driverAdapterError?.cause?.constraint?.fields
    // Neon driver wraps field names in quotes e.g. '"userId"'
    const target = rawTarget?.map((t: string) => t.replace(/"/g, ""))

    // Domain-specific messages for known unique constraints
    if (target?.includes("userId") && target?.includes("tourId")) {
        return new AppError("You have already reviewed this tour", 400)
    }

    const field = target ? target.join(".") : "unknown"
    return new AppError(`Duplicate field value: ${field}. Please use another value!`, 400)
}

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401)

const handleJWTExpiredError = () => new AppError("Your token has expired! Please log in again!", 401)

const globalErrorHandler = (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development"

    // Transform known error types into clean AppErrors (applies in all environments)
    let error: ExtendedError = { ...err, message: err.message }

    if (err.code === "P2002") error = handlePrismaDuplicateFields(err as Prisma.PrismaClientKnownRequestError)
    if (err.name === "JsonWebTokenError") error = handleJWTError()
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError()

    if (env === "development") {
        sendErrorDev(error, req, res)
    } else {
        sendErrorProd(error, req, res)
    }
}

export default globalErrorHandler
