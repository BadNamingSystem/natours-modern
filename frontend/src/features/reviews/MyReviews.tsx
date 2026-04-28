import GradientLabel from "../../components/GradientLabel.tsx"
import { useMyReviews } from "./useMyReviews.ts"
import Spinner from "../../components/Spinner.tsx"
import PageNotFound from "../../pages/PageNotFound.tsx"
import Review from "./Review.tsx"

function MyReviews() {
    const { reviews, isLoadingReviews, error } = useMyReviews()

    if (isLoadingReviews) return <Spinner />
    if (error) return <PageNotFound />

    if (!reviews || reviews.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
                <p className="text-3xl font-light text-stone-400">You haven't reviewed any tours yet!</p>
            </div>
        )
    }

    return (
        <div className="px-12 text-center">
            <GradientLabel>My Reviews</GradientLabel>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    )
}

export default MyReviews
