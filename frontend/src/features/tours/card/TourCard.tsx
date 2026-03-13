import type { TestTour } from "../../types/types.ts"
import CardHeader from "./CardHeader.tsx"
import CardDetails from "./CardDetails.tsx"
import CardFooter from "./CardFooter.tsx"

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
        <div className="flex w-full flex-col overflow-hidden rounded-md bg-gray-50 text-base leading-[1.6] font-light text-neutral-500 shadow-lg transition-all duration-300">
            <CardHeader imageCover={imageCover} name={name} />
            <CardDetails
                startLocation={startLocation}
                summary={summary}
                difficulty={difficulty}
                duration={duration}
                startDate={startDate}
                stops={stops}
                maxGroupSize={maxGroupSize}
            />
            <CardFooter price={price} ratingsAverage={ratingsAverage} ratingsQuantity={ratingsQuantity} />
        </div>
    )
}

export default TourCard
