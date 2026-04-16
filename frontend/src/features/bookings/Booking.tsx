import { SERVER_URL } from "../../config.ts"
import { Calendar, Flag, User } from "lucide-react"
import type { Booking as BookingType } from "../../types/types.ts"
import { useNavigate } from "react-router"

function Booking({ booking }: { booking: BookingType }) {
    const {
        tour: { imageCover, name, price, duration, difficulty, maxGroupSize, slug },
    } = booking

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/tours/${slug}`)}
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
            <div className="relative h-48">
                <img src={`${SERVER_URL}img/tours/${imageCover}`} alt={name} className="h-full w-full object-cover" />
                <div className="absolute top-4 right-4 rounded-sm bg-linear-to-br from-emerald-400 to-emerald-600 px-4 py-2 text-xl font-bold text-white shadow-md">
                    ${price}
                </div>
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
