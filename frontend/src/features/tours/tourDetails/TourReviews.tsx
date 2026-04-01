import ReviewCard from "./ReviewCard.tsx"
import type { Review } from "../../../types/types.ts"

function TourReviews({ reviews }: { reviews: Review[] }) {
    if (!reviews || reviews.length === 0) return null

    return (
        <section className="relative z-50 mt-[-8vw] bg-linear-to-br from-emerald-400 to-emerald-600 py-120 [clip-path:polygon(0_8vw,100%_0,100%_calc(100%-8vw),0_100%)]">
            <ul className="mx-auto flex max-w-max snap-x snap-mandatory gap-x-16 overflow-x-auto px-[4vw] py-12">
                {reviews.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </ul>
        </section>
    )
}

export default TourReviews
