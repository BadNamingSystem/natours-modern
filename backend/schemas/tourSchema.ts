import { z } from "zod"
import { containsOnlyLetters } from "../utils/helpers.js"

const tourBaseSchema = z.object({
    name: z
        .string({ message: "A tour must have a name" })
        .trim()
        .min(10, "A tour name must have at least 10 characters")
        .max(40, "A tour name must have less or equal than 40 characters")
        .refine(val => containsOnlyLetters(val), {
            message: "A tour name must only contain letters and spaces",
        }),
    duration: z.number({ message: "A tour must have a duration" }),
    maxGroupSize: z.number({ message: "A tour must have a group size" }),
    difficulty: z.enum(["easy", "medium", "difficult"], {
        message: "Difficulty must be either: easy, medium, or difficult",
    }),
    ratingsAverage: z
        .number()
        .min(1)
        .max(5)
        .optional()
        .transform(val => (val ? Math.round(val * 10) / 10 : val)),
    ratingsQuantity: z.number().optional(),
    price: z.number({ message: "A tour must have a price" }),
    priceDiscount: z.number().optional(),
    summary: z.string({ message: "A tour must have a summary" }).trim(),
    description: z.string().trim().optional(),
    imageCover: z.string({ message: "A tour must have a cover image" }),
    images: z.array(z.string()).optional(),
    startDates: z.array(z.string()).optional(),
    secretTour: z.boolean().optional(),
    startLocation: z.record(z.string(), z.unknown()).optional(),
    locations: z.array(z.record(z.string(), z.unknown())).optional(),
    guides: z
        .array(z.string())
        .optional()
        .transform(ids => (ids ? { set: ids.map(id => ({ id })) } : undefined)),
})

export const tourSchema = z.object({
    body: tourBaseSchema.refine(data => !data.priceDiscount || data.priceDiscount < data.price, {
        message: "Discount price should be below regular price",
        path: ["priceDiscount"],
    }),
})

export const tourUpdateSchema = z.object({
    body: tourBaseSchema.partial().refine(
        data => {
            // Only validate if BOTH are provided in the update
            if (data.price !== undefined && data.priceDiscount !== undefined) {
                return data.priceDiscount < data.price
            }
            return true
        },
        {
            message: "Discount price should be below regular price",
            path: ["priceDiscount"],
        },
    ),
})
