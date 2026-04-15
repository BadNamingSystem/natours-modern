import { useMutation } from "@tanstack/react-query"
import { requestPasswordReset as requestResetApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

export function useEmailForPassReset() {
    const navigate = useNavigate()

    const { mutate: requestPasswordReset, isPending } = useMutation({
        mutationFn: requestResetApi,
        onSuccess: () => {
            toast.success("Password updated successfully!")
        },
        onError: error => {
            console.error(error.message)
            toast.error("Email address not found in database")
        },
    })

    return { requestPasswordReset, isPending }
}
