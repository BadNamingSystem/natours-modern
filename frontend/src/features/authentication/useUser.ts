import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth.ts"
export function useUser() {
    const { isPending, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    })
    return {
        isPending,
        user,
        name: user?.name.split(" ")[0],
        photo: user?.photo,
        isAuthenticated: !!user,
    }
}
