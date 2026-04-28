import { useQuery } from "@tanstack/react-query"
import { getMyReviews } from "../../services/apiReviews.ts"

export function useMyReviews() {
    // prettier-ignore
    const { data: reviews, isPending: isLoadingReviews, error } = useQuery({
        queryKey: ["my-reviews"],
        queryFn: getMyReviews,
    })

    return { reviews, isLoadingReviews, error }
}
