import { z } from "zod"

const reviewBaseSchema = z.object({
    review: z.string({ message: "Review cannot be empty" }).trim(),
    rating: z
        .number({ message: "Rating is required" })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
})

export const createReviewSchema = z.object({
    body: reviewBaseSchema,
})

export const updateReviewSchema = z.object({
    body: reviewBaseSchema.partial(),
})
