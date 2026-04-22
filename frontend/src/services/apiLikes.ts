import { API_URL } from "../config.ts"

export type LikeStatus = {
    liked: boolean
    likesCount: number
}

export const getTourLikeStatus = async (tourId: string) => {
    const response = await fetch(`${API_URL}tours/${tourId}/likes`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as LikeStatus
}

export const likeTour = async (tourId: string) => {
    const response = await fetch(`${API_URL}tours/${tourId}/likes`, {
        method: "POST",
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as LikeStatus
}

export const unlikeTour = async (tourId: string) => {
    const response = await fetch(`${API_URL}tours/${tourId}/likes`, {
        method: "DELETE",
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as LikeStatus
}
