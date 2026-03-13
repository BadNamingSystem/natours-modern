import { API_URL } from "../config.ts"
import type { Tour } from "../types/types.ts"

export const getAllTours = async () => {
    const response = await fetch(`${API_URL}tours`)
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as Tour[]
}

export const getTour = async (id: string) => {
    const response = await fetch(`${API_URL}tours/${id}`)
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as Tour
}

export const getTourBySlug = async (slug: string) => {
    const response = await fetch(`${API_URL}tours/name/${slug}`)
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as Tour
}
