import { Clock, MapPin } from "lucide-react"
import { SERVER_URL } from "../../../config.ts"
import LikeTour from "../../likes/LikeTour.tsx"
import { useLikesStatus } from "../../likes/useLikesStatus.ts"
import { useToggleLike } from "../../likes/useToggleLike.ts"
import { useUser } from "../../user/useUser.ts"
import toast from "react-hot-toast"
import Modal from "../../../components/Modal.tsx"
import ReviewTour from "../ReviewTour.tsx"
import CreateUpdateReview from "../../reviews/CreateUpdateReview.tsx"
import type { Review } from "../../../types/types.ts"

type Props = {
    name: string
    imageCover: string
    duration: number
    startingFrom: string
    tourId: string
    likesCount?: number
    reviews?: Review[]
}

function TourHero({ name, imageCover, duration, startingFrom, tourId, likesCount = 0, reviews = [] }: Props) {
    const { id: currentUserId, isAuthenticated } = useUser()
    const { likesCount: currentLikes, liked, isLoadingLikes } = useLikesStatus(tourId)
    const { toggleLike, isTogglingLike } = useToggleLike(tourId)
    const hasReviewedTour = reviews.some(review => review.userId === currentUserId)

    const handleToggleLike = () => {
        if (!isAuthenticated) {
            toast.error("Please login or create an account to like a tour")
            return
        }

        toggleLike()
    }

    return (
        <section className="relative h-[38vw] [clip-path:polygon(0_0,100%_0,100%_83%,0_100%)] max-lg:h-auto max-lg:min-h-168">
            {/* Background image + overlay */}
            <div className="h-full max-lg:absolute max-lg:inset-0">
                <div className="absolute h-full w-full bg-linear-to-br from-green-800 to-green-600 opacity-45"></div>
                <img
                    className="h-full w-full object-cover"
                    src={`${SERVER_URL}img/tours/${imageCover}`}
                    alt={`${name} image cover`}
                />
            </div>
            <LikeTour
                likesCount={currentLikes ?? likesCount}
                liked={liked ?? false}
                isLoading={isTogglingLike || isLoadingLikes}
                onClick={handleToggleLike}
            />
            {!hasReviewedTour && (
                <Modal>
                    <Modal.Open opens="create-review">
                        <ReviewTour className="top-24 right-4 lg:top-36 lg:right-8" />
                    </Modal.Open>
                    <Modal.Window name="create-review">
                        <CreateUpdateReview mode="create" tourId={tourId} />
                    </Modal.Window>
                </Modal>
            )}
            {hasReviewedTour && (
                <p className="absolute top-24 right-4 z-20 rounded-full bg-white/20 px-6 py-3 text-2xl font-medium text-white backdrop-blur-md lg:top-36 lg:right-8">
                    You reviewed this tour!
                </p>
            )}
            <div className="absolute top-[45%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-white max-lg:top-1/2 max-lg:px-4">
                <h1 className="mx-auto mb-10 w-4xl text-center text-[5rem] leading-[1.4] font-light tracking-[1rem] uppercase max-lg:mb-6 max-lg:w-full max-lg:max-w-4xl max-lg:text-[3rem] max-lg:leading-[1.05] max-lg:tracking-[0.25rem]">
                    <span className="rounded-md bg-linear-to-br from-green-800 to-green-600 [box-decoration-break:clone] px-6 py-2 max-lg:px-4 max-lg:py-3 max-lg:leading-[1.35]">
                        {name} Tour
                    </span>
                </h1>

                <div className="flex items-center justify-center gap-10 text-2xl font-bold tracking-widest uppercase drop-shadow-md max-lg:flex-col max-lg:gap-4 max-lg:text-[1.4rem]">
                    <div className="flex items-center gap-3">
                        <Clock />
                        <span>{duration} days</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin />
                        <span>{startingFrom}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourHero
