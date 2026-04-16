import { z } from "zod"

export const createBookingSchema = z.object({
    body: z.object({
        tourId: z.string({
            message: "A booking must belong to a tour!",
        }),
        userId: z.string({
            message: "A booking must belong to a user!",
        }),
        price: z
            .number({
                message: "A booking must have a price!",
            })
            .min(0, "Price cannot be negative"),
        paid: z.boolean().optional().default(true),
    }),
})

export const updateBookingSchema = z.object({
    body: z.object({
        tourId: z.string().optional(),
        userId: z.string().optional(),
        price: z.number().min(0).optional(),
        paid: z.boolean().optional(),
    }),
})
