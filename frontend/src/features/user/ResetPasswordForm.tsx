import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { MoveRight } from "lucide-react"
import { useResetPassword } from "./useResetPassword.ts"
import toast from "react-hot-toast"

function ResetPasswordForm() {
    const { resetPassword, isPending } = useResetPassword()

    function handleResetPassword(formData: FormData) {
        const password = formData.get("password") as string
        const passwordConfirm = formData.get("passwordConfirm") as string

        if (!password || !passwordConfirm) return
        if (password !== passwordConfirm) {
            toast.error("Passwords do not match!")
            return
        }

        resetPassword({ password, passwordConfirm })
    }

    return (
        <main className="flex h-full grow items-center justify-center overflow-hidden bg-gray-100 px-24 py-32 text-stone-500">
            <div className="w-200 max-w-220 rounded-md bg-white px-28 py-20">
                <GradientLabel>Reset you password</GradientLabel>
                <form action={handleResetPassword}>
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
                    <Button
                        size="large"
                        color="emerald"
                        className="px-12 py-8 text-3xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl"
                        round
                        ring
                        disabled={isPending}
                    >
                        <MoveRight />
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default ResetPasswordForm
