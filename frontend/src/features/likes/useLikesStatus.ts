import { useQuery } from "@tanstack/react-query"
import { getTourLikeStatus } from "../../services/apiLikes.ts"
import { useUser } from "../user/useUser.ts"

export function useLikesStatus(tourId: string) {
    const { isAuthenticated } = useUser()

    // prettier-ignore
    const { data, isLoading: isLoadingLikes, error } = useQuery({
        queryKey: ["likes", tourId],
        queryFn: () => getTourLikeStatus(tourId),
        enabled: !!tourId && isAuthenticated,
    })

    return {
        likesCount: data?.likesCount,
        liked: data?.liked,
        isLoadingLikes,
        error,
    }
}
