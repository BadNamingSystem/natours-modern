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
        fullName: user?.name,
        name: user?.name.split(" ")[0],
        email: user?.email,
        photo: user?.photo,
        role: user?.role,
        isAuthenticated: !!user,
    }
}
