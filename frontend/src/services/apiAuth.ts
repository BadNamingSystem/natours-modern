import { API_URL } from "../config.ts"
import type { User } from "../types/types.ts"

export const login = async ({ email, password }: { email: string; password: string }) => {
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
