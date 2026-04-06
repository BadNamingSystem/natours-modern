import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePassword as updatePasswordApi } from "../../services/apiUser.ts"
import toast from "react-hot-toast"

export function useUpdatePassword() {
    const queryClient = useQueryClient()

    const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation({
        mutationFn: updatePasswordApi,
        onSuccess: () => {
            void queryClient.invalidateQueries()
            toast.success("Password updated successfully!")
        },
        onError: error => {
            console.error(error.message)
            toast.error("Failed to update your password!")
        },
    })

    return { updatePassword, isUpdatingPassword }
}
