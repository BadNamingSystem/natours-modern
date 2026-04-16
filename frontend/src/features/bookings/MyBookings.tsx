import { useMyBookings } from "./useMyBookings"
import Spinner from "../../components/Spinner"
import Booking from "./Booking.tsx"
import type { Booking as BookingType } from "../../types/types.ts"
import PageNotFound from "../../pages/PageNotFound.tsx"
import GradientLabel from "../../components/GradientLabel.tsx"

function MyBookings() {
    const { bookings, isPending, error } = useMyBookings()

    if (isPending) return <Spinner />
    if (error) return <PageNotFound />

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
                <p className="text-3xl font-light text-stone-400">You haven't booked any tours yet!</p>
            </div>
        )
    }

    return (
        <div className="px-12 text-center">
            <GradientLabel>My Bookings</GradientLabel>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {bookings.map((booking: BookingType) => (
                    <Booking key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    )
}

export default MyBookings
