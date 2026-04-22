import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type LikeStatus, likeTour, unlikeTour } from "../../services/apiLikes.ts"
import toast from "react-hot-toast"

export function useToggleLike(tourId: string) {
    const queryClient = useQueryClient()

    const { mutate: toggleLike, isPending: isTogglingLike } = useMutation({
        mutationFn: async () => {
            const current = queryClient.getQueryData<LikeStatus>(["likes", tourId])

            if (current?.liked) {
                return unlikeTour(tourId)
            }

            return likeTour(tourId)
        },
        onSuccess: status => {
            queryClient.setQueryData(["likes", tourId], status)
            toast.success(`You ${status.liked ? "liked" : "unliked"} this tour`)
        },
    })

    return { toggleLike, isTogglingLike }
}
