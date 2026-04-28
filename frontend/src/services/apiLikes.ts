import { API_URL } from "../config.ts"

export type LikeStatus = {
    liked: boolean
    likesCount: number
}

type Method = "GET" | "POST" | "DELETE"

const likeRequest = async (tourId: string, method: Method) => {
    const response = await fetch(`${API_URL}tours/${tourId}/likes`, {
        method,
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as LikeStatus
}

export const getTourLikeStatus = (tourId: string) => likeRequest(tourId, "GET")
export const likeTour = (tourId: string) => likeRequest(tourId, "POST")
export const unlikeTour = (tourId: string) => likeRequest(tourId, "DELETE")
