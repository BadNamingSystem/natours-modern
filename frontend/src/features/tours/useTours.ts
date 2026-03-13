import { useQuery } from "@tanstack/react-query"
import { getAllTours } from "../../services/apiTours.ts"

export function useTours() {
    // prettier-ignore
    const {data: tours, isLoading, error} = useQuery({
        queryKey: ["tours"],
        queryFn: getAllTours
    })

    return { tours, isLoading, error }
}
