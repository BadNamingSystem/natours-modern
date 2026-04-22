import { API_URL } from "../config.ts"
import type { User } from "../types/types.ts"

export type LoginArgs = {
    email: string
    password: string
}

export const login = async ({ email, password }: LoginArgs) => {
    const response = await fetch(`${API_URL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data.data.user as User
}

export type signupArgs = {
    name: string
    email: string
    password: string
    passwordConfirm: string
}

export const signup = async ({ name, email, password, passwordConfirm }: signupArgs) => {
    const response = await fetch(`${API_URL}users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data.data.user as User
}

export const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}users/me`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) return null

    return data.data as User
}

export const logout = async () => {
    const response = await fetch(`${API_URL}users/logout`, {
        method: "GET",
        credentials: "include",
    })

    if (!response.ok) throw new Error("Logout failed")
}

export const requestPasswordReset = async (email: string) => {
    const response = await fetch(`${API_URL}users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }
}

type ResetPasswordArgs = {
    token: string
    password: string
    passwordConfirm: string
}

export const resetPassword = async ({ token, password, passwordConfirm }: ResetPasswordArgs) => {
    const response = await fetch(`${API_URL}users/reset-password/${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, passwordConfirm }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data.data.user as User
}
