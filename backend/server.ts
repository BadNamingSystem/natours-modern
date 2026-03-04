import { Server } from "node:http"
import app from "./app.js"
import { dbError, dbSuccess, appRunning } from "./utils/loggers.js"
import prisma from "./utils/db.js"

// 1. UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (err: Error) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
    dbError(err)
    process.exit(1)
})

let server: Server

// 2. DATABASE CONNECTION & SERVER STARTUP
prisma
    .$connect()
    .then(() => {
        dbSuccess("Neon Serverless", process.env.NODE_ENV || "development")

        const port = process.env.PORT || 3000
        server = app.listen(port, () => {
            appRunning(port)
        })
    })
    .catch(err => {
        dbError(err)
        process.exit(1)
    })

// 3. UNHANDLED REJECTIONS
process.on("unhandledRejection", (err: Error) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...")
    dbError(err)
    // Finish pending requests, then close
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})
