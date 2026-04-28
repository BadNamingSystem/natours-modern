import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import { MoveRight } from "lucide-react"
import Button from "../../components/Button.tsx"
import { useCreateReview } from "./useCreateReview.ts"
import { useUpdateReview } from "./useUpdateReview.ts"
import type { ReviewPayload } from "../../services/apiReviews.ts"

type Props = {
    mode?: "create" | "update"
    tourId?: string
    reviewId?: string
    defaultValues?: ReviewPayload
    onCloseModal?: () => void
}

function CreateUpdateReview({ mode = "create", tourId, reviewId, defaultValues, onCloseModal }: Props) {
    const { createReview, isCreatingReview } = useCreateReview()
    const { updateReview, isUpdatingReview } = useUpdateReview()
    const isPending = isCreatingReview || isUpdatingReview

    function handleCreateUpdateReview(formData: FormData) {
        const review = String(formData.get("review") ?? "").trim()
        const rating = Number(formData.get("rating"))
        const reviewData: ReviewPayload = { review, rating }

        if (mode === "update") {
            if (!reviewId) return
            updateReview(
                { reviewId, reviewData },
                {
                    onSuccess: () => onCloseModal?.(),
                },
            )
            return
        }

        if (!tourId) return
        createReview(
            { tourId, reviewData },
            {
                onSuccess: () => onCloseModal?.(),
            },
        )
    }

    return (
        <div className="w-full max-w-2xl rounded-md bg-white px-6 py-8 shadow-xl sm:px-8 sm:py-10">
            <GradientLabel>{mode === "update" ? "Update Review" : "New Review"}</GradientLabel>
            <form action={handleCreateUpdateReview} className="mt-6 space-y-6">
                <Input
                    type="number"
                    id="rating"
                    name="rating"
                    label="Rating"
                    min={1}
                    max={5}
                    required
                    defaultValue={defaultValues?.rating}
                />
                <Input
                    type="text"
                    id="review"
                    name="review"
                    label="Your Review"
                    min={12}
                    max={260}
                    required
                    defaultValue={defaultValues?.review}
                />
                <Button
                    size="medium"
                    color="emerald"
                    className="w-full px-6 py-4 text-lg font-normal text-white uppercase hover:-translate-y-1 hover:shadow-xl sm:w-auto"
                    round
                    ring
                    disabled={isPending}
                >
                    <MoveRight />
                </Button>
            </form>
        </div>
    )
}

export default CreateUpdateReview
