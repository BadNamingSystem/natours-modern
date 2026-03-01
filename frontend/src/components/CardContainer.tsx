import { tours } from "../../dev-data/tours.ts"
import TourCard from "./TourCard.tsx"

function CardContainer() {
    const tourData = tours

    return (
        <div className="grid max-w-480 grid-cols-3 gap-28">
            {tourData.map(tour => (
                <TourCard tour={tour} key={tour.id} />
            ))}
        </div>
    )
}

export default CardContainer
