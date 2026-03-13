import TourCard from "./TourCard.tsx"
import { useTours } from "../useTours.ts"
import PageNotFound from "../../../pages/PageNotFound.tsx"

function CardContainer() {
    const { tours, error } = useTours()

    if (error) return <PageNotFound />
    if (!tours) return null

    return (
        <div className="grid max-w-480 grid-cols-3 gap-28">
            {tours.map(tour => (
                <TourCard tour={tour} key={tour.id} />
            ))}
        </div>
    )
}

export default CardContainer
