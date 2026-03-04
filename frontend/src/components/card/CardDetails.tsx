import { Calendar, Flag, MapPin, User } from "lucide-react"

type Props = {
    startLocation: string
    summary: string
    difficulty: string
    duration: number
    startDate: string
    stops: number
    maxGroupSize: number
}

function CardDetails({ startLocation, summary, duration, difficulty, startDate, stops, maxGroupSize }: Props) {
    return (
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
    )
}

export default CardDetails
