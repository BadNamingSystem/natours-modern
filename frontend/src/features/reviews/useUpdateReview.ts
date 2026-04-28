import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateReview as updateReviewApi, type ReviewPayload } from "../../services/apiReviews.ts"
import toast from "react-hot-toast"

export function useUpdateReview() {
    const queryClient = useQueryClient()

    const { mutate: updateReview, isPending: isUpdatingReview } = useMutation({
        mutationFn: ({ reviewId, reviewData }: { reviewId: string; reviewData: ReviewPayload }) =>
            updateReviewApi(reviewId, reviewData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
            void queryClient.invalidateQueries({ queryKey: ["tour"] })
            toast.success("Review updated")
        },
        onError: (error: Error) => {
            console.error(error.message)
            toast.error(error.message || "Failed to update review")
        },
    })

    return { updateReview, isUpdatingReview }
}
