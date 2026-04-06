import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { useUpdatePassword } from "./useUpdatePassword.ts"
import toast from "react-hot-toast"
import { useRef } from "react"

function UpdatePasswordForm() {
    const { updatePassword, isUpdatingPassword } = useUpdatePassword()
    const formRef = useRef<HTMLFormElement>(null)

    function handleUpdatePassword(formData: FormData) {
        const currentPassword = formData.get("currentPassword") as string
        const password = formData.get("password") as string
        const passwordConfirm = formData.get("passwordConfirm") as string

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match")
            return
        }

        updatePassword(
            { currentPassword, password, passwordConfirm },
            {
                onSuccess: () => {
                    formRef.current?.reset()
                },
            },
        )
    }

    return (
        <div className="mx-auto max-w-272 px-32">
            <GradientLabel>Password change</GradientLabel>
            <form action={handleUpdatePassword} ref={formRef}>
                <Input
                    type="password"
                    minLength={8}
                    id="currentPassword"
                    name="currentPassword"
                    label="Current password"
                    placeholder="••••••••"
                    required
                />
                <Input
                    type="password"
                    minLength={8}
                    id="password"
                    name="password"
                    label="New password"
                    placeholder="••••••••"
                    required
                />
                <Input
                    type="password"
                    minLength={8}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    autoComplete="new-password"
                    label="Confirm new password"
                    placeholder="••••••••"
                    required
                />
                <div className="mt-10 flex justify-end">
                    <Button
                        size="large"
                        color="emerald"
                        round
                        className="px-12 py-5 text-2xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl"
                        disabled={isUpdatingPassword}
                    >
                        Update password
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePasswordForm
