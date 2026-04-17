import { Calendar, Flag, MapPin, User } from "lucide-react"

type Props = {
    startingFrom: string
    summary: string
    difficulty: string
    duration: number
    startDate: string
    stops: number
    maxGroupSize: number
}

function CardDetails({ startingFrom, summary, duration, difficulty, startDate, stops, maxGroupSize }: Props) {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-5 py-6 sm:gap-x-7 sm:gap-y-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h4 className="col-span-full text-lg font-bold tracking-wide uppercase sm:text-xl">{`${difficulty} ${duration}-day tour`}</h4>
            <p className="col-span-full -mt-1 mb-1 text-base italic sm:-mt-4 sm:mb-3 sm:text-xl lg:text-2xl">{summary}</p>
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                <MapPin color="#39B24C" />
                <span>{startingFrom}</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                <Calendar color="#39B24C" />
                <span>{startDate}</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                <Flag color="#39B24C" />
                <span>{stops} stops</span>
            </div>
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
                <User color="#39B24C" />
                <span>{maxGroupSize} people</span>
            </div>
        </div>
    )
}

export default CardDetails
