import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { getTourBySlug } from "../../services/apiTours.ts"

export function useTour() {
    const { slug } = useParams<{ slug: string }>()

    // prettier-ignore
    const { data: tour, isLoading, error, } = useQuery({
        queryKey: ["tour", slug],
        queryFn: () => getTourBySlug(slug as string),
        enabled: !!slug,
    })

    return { tour, isLoading, error }
}
