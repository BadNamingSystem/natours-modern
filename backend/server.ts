import app from "./app.js"
import { dbError, appRunning } from "./utils/loggers.js"

// 1. UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (err: Error) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
    dbError(err)
    process.exit(1)
})

let server

const port = process.env.PORT || 3000
server = app.listen(port, () => {
    appRunning(port)
})

// 2. UNHANDLED REJECTIONS
process.on("unhandledRejection", (err: Error) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...")
    dbError(err)
    // Graceful shutdown: Finish pending requests, then close
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
})
