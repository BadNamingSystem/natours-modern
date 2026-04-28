import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createReview as createReviewApi, type ReviewPayload } from "../../services/apiReviews.ts"
import toast from "react-hot-toast"

export function useCreateReview() {
    const queryClient = useQueryClient()

    const { mutate: createReview, isPending: isCreatingReview } = useMutation({
        mutationFn: ({ tourId, reviewData }: { tourId: string; reviewData: ReviewPayload }) =>
            createReviewApi(tourId, reviewData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
            void queryClient.invalidateQueries({ queryKey: ["tour"] })
            toast.success("Review created")
        },
        onError: (error: Error) => {
            console.error(error.message)
            toast.error(error.message || "Failed to create review")
        },
    })

    return { createReview, isCreatingReview }
}
