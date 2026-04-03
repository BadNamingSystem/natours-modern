import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { logout as logoutApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"
export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", { replace: true })
            toast.success("Logged out successfully")
        },
    })

    return { logout, isPending }
}
