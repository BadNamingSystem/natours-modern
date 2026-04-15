import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import { resetPassword as resetPasswordApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"

export function useResetPassword() {
    const { resetToken } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: ({ password, passwordConfirm }: { password: string; passwordConfirm: string }) =>
            resetPasswordApi({ token: resetToken!, password, passwordConfirm }),
        onSuccess: user => {
            void queryClient.setQueryData(["user"], user)
            toast.success("Password successfully reset!")
            navigate("/me", { replace: true })
        },
        onError: error => {
            console.error(error)
        },
    })

    return { resetPassword, isPending }
}
