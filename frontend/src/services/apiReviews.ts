import { API_URL } from "../config.ts"
import type { Review } from "../types/types.ts"

export type ReviewPayload = {
    review?: string
    rating?: number
}

export const getMyReviews = async () => {
    const response = await fetch(`${API_URL}reviews/my-reviews`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Something went wrong")

    return data.data as Review[]
}

export const deleteReview = async (reviewId: string) => {
    const response = await fetch(`${API_URL}reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to delete review")
    }
}

export const createReview = async (tourId: string, reviewData: ReviewPayload) => {
    const response = await fetch(`${API_URL}tours/${tourId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Failed to create review")
    }

    return data.data as Review
}

export const updateReview = async (reviewId: string, reviewData: ReviewPayload) => {
    const response = await fetch(`${API_URL}reviews/${reviewId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Failed to update review")
    }

    return data.data as Review
}
