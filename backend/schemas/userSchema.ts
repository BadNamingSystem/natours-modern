import { z } from "zod"
import { containsOnlyLetters } from "../utils/helpers.js"

const userBaseSchema = z.object({
    name: z
        .string({ message: "Please tell us your name!" })
        .trim()
        .min(2, "Name is too short")
        .refine(val => containsOnlyLetters(val), {
            message: "A name must only contain letters and spaces",
        }),
    email: z.string({ message: "Please provide your email" }).trim().email("Please provide a valid email"),
    photo: z.string().optional(),
    role: z.enum(["user", "guide", "lead-guide", "admin"]).optional(),
    active: z.boolean().optional(),
})

export const signupSchema = z.object({
    body: userBaseSchema
        .extend({
            password: z
                .string({ message: "Please provide a password" })
                .min(8, "Password must be at least 8 characters long"),
            passwordConfirm: z.string({ message: "Please confirm your password" }),
        })
        .refine(data => data.password === data.passwordConfirm, {
            message: "Passwords are not the same!",
            path: ["passwordConfirm"],
        }),
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Please provide a valid email"),
        password: z.string().min(1, "Password is required"),
    }),
})

export const userUpdateSchema = z.object({
    body: userBaseSchema.partial(),
})
