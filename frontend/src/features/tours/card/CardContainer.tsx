import TourCard from "./TourCard.tsx"
import { useTours } from "../useTours.ts"
import PageNotFound from "../../../pages/PageNotFound.tsx"
import Spinner from "../../../components/Spinner.tsx"
import FullPage from "../../../components/FullPage.tsx"

function CardContainer() {
    const { tours, isLoading, error } = useTours()

    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )
    if (error || !tours) return <PageNotFound />

    return (
        <div className="grid max-w-480 grid-cols-3 gap-28">
            {tours.map(tour => (
                <TourCard tour={tour} key={tour.id} />
            ))}
        </div>
    )
}

export default CardContainer

