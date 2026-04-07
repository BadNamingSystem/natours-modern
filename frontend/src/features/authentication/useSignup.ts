import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"

export function useSignup() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: signup, isPending: isSigningUp } = useMutation({
        mutationFn: signupApi,
        onSuccess: user => {
            queryClient.setQueryData(["user"], user)
            navigate("/me", { replace: true })
            toast.success("Account created")
        },
        onError: error => {
            console.error(error.message)
            toast.error("Failed to create you account")
        },
    })

    return { signup, isSigningUp }
}
