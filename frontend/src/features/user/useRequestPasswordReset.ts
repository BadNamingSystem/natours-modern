import { useMutation } from "@tanstack/react-query"
import { requestPasswordReset as requestResetApi } from "../../services/apiAuth.ts"
import toast from "react-hot-toast"

export function useRequestPasswordReset() {
    // prettier-ignore
    const { mutate: requestPasswordReset, isPending, isSuccess, isError, } = useMutation<void, Error, string>({
        mutationFn: requestResetApi,
        onSuccess: () => {
            toast.success("Check you email address for the reset link!")
        },
        onError: error => {
            console.error(error.message)
            toast.error(error.message)
        },
    })

    return { requestPasswordReset, isPending, isSuccess, isError }
}
