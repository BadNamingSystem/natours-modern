import { z } from "zod"

const reviewBaseSchema = z.object({
    review: z.string({ message: "Review cannot be empty" }).trim(),
    rating: z.number({ message: "Rating is required" }).min(1).max(5),
    createdAt: z.date(),
    userId: z.string(),
    tourId: z.string(),
})

type ReviewBody = z.infer<typeof reviewBaseSchema>
