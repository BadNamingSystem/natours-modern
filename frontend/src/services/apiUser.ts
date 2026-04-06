import { API_URL } from "../config.ts"
import type { User } from "../types/types.ts"

export const updateMe = async ({ name, email }: { name: string; email: string }) => {
    const response = await fetch(`${API_URL}users/update-me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data.data.user as User
}

export const updatePassword = async ({
    currentPassword,
    password,
    passwordConfirm,
}: {
    currentPassword: string
    password: string
    passwordConfirm: string
}) => {
    const response = await fetch(`${API_URL}users/update-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, password, passwordConfirm }),
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
    }

    return data.data.user as User
}
