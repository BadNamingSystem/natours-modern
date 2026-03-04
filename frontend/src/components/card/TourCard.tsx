import type { TestTour } from "../types/types.ts"
import { Calendar, Flag, MapPin, User } from "lucide-react"
import { Link } from "react-router"

function TourCard({ tour }: { tour: TestTour }) {
    const {
        name,
        difficulty,
        startLocation,
        maxGroupSize,
        startDates,
        price,
        ratingsAverage,
        ratingsQuantity,
        stops,
        duration,
        summary,
        imageCover,
    } = tour
    const startDate = new Date(startDates[0]).toLocaleString("en-us", { month: "long", year: "numeric" })

    return (
        <div className="flex w-full flex-col overflow-hidden rounded-md bg-gray-50 font-sans text-base leading-[1.6] font-light text-neutral-500 shadow-lg transition-all duration-300">
            {/* card header/image */}
            <div className="relative">
                <div className="h-88 w-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
                    <div className="absolute h-full w-full bg-linear-to-br from-green-800 to-green-600 opacity-45"></div>
                    <img
                        className="h-full w-full object-cover"
                        src={`/tours/${imageCover}`}
                        alt={`${name} image cover`}
                    />
                </div>
                <h3 className="absolute right-8 bottom-4 z-10 w-[70%] text-right text-[2.75rem] font-light text-white uppercase">
                    <span className="rounded-sm bg-linear-to-br from-green-800 to-green-600 box-decoration-clone px-6 py-4 leading-normal opacity-90">
                        {name}
                    </span>
                </h3>
            </div>
            {/* card details */}
            <div className="grid grid-cols-2 gap-x-7 gap-y-8 px-10 py-12">
                <h4 className="col-span-full text-xl font-bold tracking-wide uppercase">{`${difficulty} ${duration}-day tour`}</h4>
                <p className="col-span-full -mt-4 mb-3 text-2xl italic">{summary}</p>
                <div className="flex items-center gap-2 text-xl">
                    <MapPin color="#39B24C" />
                    <span>{startLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-xl">
                    <Calendar color="#39B24C" />
                    <span>{startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-xl">
                    <Flag color="#39B24C" />
                    <span>{stops} stops</span>
                </div>
                <div className="flex items-center gap-2 text-xl">
                    <User color="#39B24C" />
                    <span>{maxGroupSize} people</span>
                </div>
            </div>
            {/* card footer */}
            <div className="mt-auto flex items-center justify-between border-t border-stone-200 bg-stone-100 px-10 py-10">
                <div className="flex flex-col gap-2 text-xl">
                    <p>
                        <span className="font-bold text-neutral-600">{`$${price} `}</span>
                        <span className="text-neutral-400">per person</span>
                    </p>
                    <p>
                        <span className="font-bold text-neutral-600">{ratingsAverage}</span>
                        <span className="text-neutral-400">{` rating (${ratingsQuantity})`}</span>
                    </p>
                </div>

                <Link
                    className="rounded-full bg-emerald-600 px-12 py-5 text-xl font-light tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                    to="#"
                >
                    DETAILS
                </Link>
            </div>
        </div>
    )
}

export default TourCard
