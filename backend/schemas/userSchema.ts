import { z } from "zod"
import { validateName, isValidEmail } from "../utils/helpers.js"

const userBaseSchema = z.object({
    name: z
        .string({ message: "Please provide your name" })
        .trim()
        .min(2, "Name is too short")
        .refine(val => validateName(val), {
            message: "A name must only contain letters and spaces. International characters are supported.",
        }),
    email: z
        .string({ message: "Please provide your email" })
        .trim()
        .refine(val => isValidEmail(val), {
            message: "Please provide a valid email",
        }),
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
            message: "Passwords don't match!",
            path: ["passwordConfirm"],
        }),
})

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ message: "Please provide your email" })
            .trim()
            .refine(val => isValidEmail(val), {
                message: "Please provide a valid email",
            }),
        password: z.string().min(1, "Password is required"),
    }),
})

export const userUpdateSchema = z.object({
    body: userBaseSchema.partial(),
})

export const updatePasswordSchema = z.object({
    body: z
        .object({
            currentPassword: z.string({ message: "Please provide your current password" }),
            password: z
                .string({ message: "Please provide a new password" })
                .min(8, "Password must be at least 8 characters long"),
            passwordConfirm: z.string({ message: "Please confirm your new password" }),
        })
        .refine(data => data.password === data.passwordConfirm, {
            message: "New passwords don't match!",
            path: ["passwordConfirm"],
        }),
})
export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z
            .string({ message: "Please provide your email address" })
            .trim()
            .refine(val => isValidEmail(val), {
                message: "Please provide a valid email",
            }),
    }),
})

export const resetPasswordSchema = z.object({
    body: z
        .object({
            password: z
                .string({ message: "Please provide a new password" })
                .min(8, "Password must be at least 8 characters long"),
            passwordConfirm: z.string({ message: "Please confirm your new password" }),
        })
        .refine(data => data.password === data.passwordConfirm, {
            message: "Passwords don't match!",
            path: ["passwordConfirm"],
        }),
})
