import { API_URL } from "../config.ts"
import type { Booking } from "../types/types.ts"

export type StripeSession = {
    id: string
    url: string
}

export const getCheckoutSession = async (tourId: string): Promise<StripeSession> => {
    const response = await fetch(`${API_URL}bookings/checkout-session/${tourId}`, {
        method: "GET",
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Failed to create checkout session")

    return data.session as StripeSession
}

export const getMyBookings = async () => {
    const response = await fetch(`${API_URL}bookings/my-bookings`, {
        method: "GET",
        credentials: "include",
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data.message || "Failed to fetch bookings")

    return data.data as Booking[]
}

export const deleteBooking = async (bookingId: string) => {
    const response = await fetch(`${API_URL}bookings/${bookingId}`, {
        method: "DELETE",
        credentials: "include",
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Failed to delete booking")
    }
}
