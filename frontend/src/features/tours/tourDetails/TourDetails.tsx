import { useEffect } from "react"
import Spinner from "../../../components/Spinner.tsx"
import PageNotFound from "../../../pages/PageNotFound.tsx"
import { useTour } from "../useTour.ts"
import TourHero from "./TourHero.tsx"
import TourDescription from "./TourDescription.tsx"
import TourPhotos from "./TourPhotos.tsx"
import Map from "./Map.tsx"
import TourReviews from "./TourReviews.tsx"
import TourCta from "./TourCTA.tsx"

function TourDetails() {
    const { tour, isLoading, error } = useTour()

    useEffect(() => {
        if (tour?.name) {
            document.title = `Natours Reloaded | ${tour.name}`
        }
    }, [tour])

    if (isLoading) return <Spinner />
    if (error || !tour) return <PageNotFound />

    const {
        name,
        description: tourDescription,
        imageCover,
        images,
        duration,
        startLocation: { description },
        locations,
        startDates,
        difficulty,
        ratingsAverage,
        ratingsQuantity,
        maxGroupSize,
        guides,
        reviews,
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
            <Map locations={locations} />
            <TourReviews reviews={reviews} />
            <TourCta duration={duration} images={images} tourId={tour.id} />
        </>
    )
}

export default TourDetails
