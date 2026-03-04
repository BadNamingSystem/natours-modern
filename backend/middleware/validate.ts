import { Request, Response, NextFunction } from "express"
import { ZodType, ZodError } from "zod"
import AppError from "../utils/appError.js"

export const validate = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = (await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        })) as Record<string, unknown>

        // Reassign the clean data back to the request
        if (parsed.body) req.body = parsed.body
        if (parsed.query) req.query = parsed.query as Request["query"]
        if (parsed.params) req.params = parsed.params as Request["params"]

        next()
    } catch (err) {
        if (err instanceof ZodError) {
            const message = err.issues.map(i => `${i.path.slice(1).join(".")}: ${i.message}`).join(", ")
            return next(new AppError(message, 400))
        }
        next(err)
    }
}
