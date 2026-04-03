import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: login, isPending: isLoggingIn } = useMutation({
        mutationFn: loginApi,
        onSuccess: user => {
            queryClient.setQueryData(["user"], user)
            navigate("/", { replace: true })
            toast.success("Logged in successfully")
        },
        onError: error => {
            console.error(error.message)
            toast.error("Incorrect email or password")
        },
    })

    return { login, isLoggingIn }
}
