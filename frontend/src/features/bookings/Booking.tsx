import { SERVER_URL } from "../../config.ts"
import { Calendar, Flag, User, X } from "lucide-react"
import type { Booking as BookingType } from "../../types/types.ts"
import { useNavigate } from "react-router"
import LikeTour from "../likes/LikeTour.tsx"
import { useLikesStatus } from "../likes/useLikesStatus.ts"
import { useDeleteBooking } from "./useDeleteBooking.ts"

function Booking({ booking }: { booking: BookingType }) {
    const {
        tour: { id: tourId, imageCover, name, price, duration, difficulty, maxGroupSize, slug, likesCount },
        id: bookingId,
    } = booking

    const navigate = useNavigate()
    const { likesCount: currentLikes, liked } = useLikesStatus(tourId)
    const { deleteBooking, isDeletingBooking } = useDeleteBooking()

    return (
        <div
            onClick={() => navigate(`/tours/${slug}`)}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-48">
                <img src={`${SERVER_URL}img/tours/${imageCover}`} alt={name} className="h-full w-full object-cover" />
                <div className="absolute top-4 right-4 rounded-sm bg-linear-to-br from-emerald-400 to-emerald-600 px-4 py-2 text-xl font-bold text-white shadow-md">
                    ${price}
                </div>
                <LikeTour
                    likesCount={currentLikes ?? likesCount ?? 0}
                    liked={liked ?? false}
                    className="top-4 right-auto left-4 w-fit min-w-0 cursor-default px-4 py-2 text-xl shadow-md hover:bg-white/20"
                    onClick={e => e.stopPropagation()}
                />
                <button
                    type="button"
                    onClick={e => {
                        e.stopPropagation()
                        deleteBooking(bookingId)
                    }}
                    disabled={isDeletingBooking}
                    className="absolute right-4 bottom-4 cursor-pointer rounded-full bg-stone-700 p-2 text-red-500 shadow-md transition-colors hover:bg-stone-900 hover:text-red-300"
                    aria-label="Delete booking"
                >
                    <X className="h-8 w-8" />
                </button>
            </div>

            <div className="p-8">
                <h3 className="mb-4 text-2xl font-semibold text-stone-700">{name}</h3>
                <div className="grid grid-cols-2 gap-y-4 text-xl text-stone-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-500" />
                        <span>{duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-emerald-500" />
                        <span>{difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-emerald-500" />
                        <span>Max {maxGroupSize}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking
