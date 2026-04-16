import { useQuery } from "@tanstack/react-query"
import { getMyBookings } from "../../services/apiBookings"

export const useMyBookings = () => {
    const {
        data: bookings,
        isPending,
        error,
    } = useQuery({
        queryKey: ["my-bookings"],
        queryFn: getMyBookings,
    })

    return { bookings, isPending, error }
}
