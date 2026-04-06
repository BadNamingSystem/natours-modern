import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMe as updateMeApi } from "../../services/apiUser.ts"
import toast from "react-hot-toast"

export function useUpdateMe() {
    const queryClient = useQueryClient()

    const { mutate: updateMe, isPending: isUpdatingMe } = useMutation({
        mutationFn: updateMeApi,
        onSuccess: () => {
            void queryClient.invalidateQueries()
            toast.success("Profile updated!")
        },
        onError: error => {
            console.error(error.message)
            toast.error("Failed to update your profile!")
        },
    })

    return { updateMe, isUpdatingMe }
}
