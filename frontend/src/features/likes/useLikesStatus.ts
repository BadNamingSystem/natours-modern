import { useQuery } from "@tanstack/react-query"
import { getTourLikeStatus } from "../../services/apiLikes.ts"

export function useLikesStatus(tourId: string) {
    // prettier-ignore
    const { data, isPending: isLoadingLikes, error } = useQuery({
        queryKey: ["likes", tourId],
        queryFn: () => getTourLikeStatus(tourId),
        enabled: !!tourId,
    })

    return {
        likesCount: data?.likesCount,
        liked: data?.liked,
        isLoadingLikes,
        error,
    }
}
