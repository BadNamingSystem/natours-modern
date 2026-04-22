import { useMutation } from "@tanstack/react-query"
import { getCheckoutSession, type StripeSession } from "../../services/apiBookings"
import toast from "react-hot-toast"

export const useCheckout = () => {
    const { mutate: checkout, isPending: isCheckingOut } = useMutation<StripeSession, Error, string>({
        mutationFn: getCheckoutSession,
        onSuccess: session => {
            if (session?.url) {
                // Stripe's modern approach: redirect directly to the session URL
                window.location.href = session.url
            } else {
                toast.error("Invalid session received from server.")
            }
        },
        onError: error => {
            console.error("Checkout error:", error)
            toast.error(error.message || "Failed to create checkout session.")
        },
    })

    return { checkout, isCheckingOut }
}
