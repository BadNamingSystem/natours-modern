import Spinner from "../../../components/Spinner.tsx"
import PageNotFound from "../../../pages/PageNotFound.tsx"
import { useTour } from "../useTour.ts"
import TourHero from "./TourHero.tsx"
import TourDescription from "./TourDescription.tsx"
import TourPhotos from "./TourPhotos.tsx"

function TourDetails() {
    const { tour, isLoading, error } = useTour()

    if (isLoading) return <Spinner />
    if (error || !tour) return <PageNotFound />

    const {
        name,
        description: tourDescription,
        imageCover,
        images,
        duration,
        startLocation: { description },
        startDates,
        difficulty,
        ratingsAverage,
        ratingsQuantity,
        maxGroupSize,
        guides,
    } = tour

    const startDate = new Date(startDates[0]).toLocaleString("en-us", { month: "long", year: "numeric" })

    return (
        <>
            <TourHero name={name} imageCover={imageCover} duration={duration} startingFrom={description} />
            <TourDescription
                name={name}
                tourDescription={tourDescription}
                startDate={startDate}
                difficulty={difficulty}
                ratingsAverage={ratingsAverage}
                ratingsQuantity={ratingsQuantity}
                maxGroupSize={maxGroupSize}
                guides={guides}
            />
            <TourPhotos images={images} />
        </>
    )
}

export default TourDetails
