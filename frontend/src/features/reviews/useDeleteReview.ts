import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteReview as deleteReviewApi } from "../../services/apiReviews.ts"
import toast from "react-hot-toast"

export function useDeleteReview() {
    const queryClient = useQueryClient()

    const { mutate: deleteReview, isPending: isDeletingReview } = useMutation({
        mutationFn: deleteReviewApi,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
            void queryClient.invalidateQueries({ queryKey: ["tour"] })
            toast.success("Review deleted")
        },
        onError: error => {
            const message = error instanceof Error ? error.message : "Failed to delete review"
            toast.error(message)
        },
    })

    return { deleteReview, isDeletingReview }
}
