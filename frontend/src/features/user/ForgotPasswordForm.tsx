import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { useRequestPasswordReset } from "./useRequestPasswordReset.ts"
import { MoveRight } from "lucide-react"

function ForgotPasswordForm() {
    const { requestPasswordReset, isPending, isSuccess, isError } = useRequestPasswordReset()

    function handleResetEmail(formData: FormData) {
        const email = formData.get("email") as string

        if (!email) return

        requestPasswordReset(email)
    }

    return (
        <main className="flex h-full grow items-center justify-center overflow-hidden bg-gray-100 px-24 py-32 text-stone-500">
            <div className="w-200 max-w-220 rounded-md bg-white px-28 py-20">
                <GradientLabel>Request a password reset</GradientLabel>
                <form action={handleResetEmail}>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Your Natours account email"
                        placeholder="you@example.com"
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

                    {(isSuccess || isError) && (
                        <h3
                            className={`mt-12 rounded-lg bg-gray-100 px-6 py-4 text-center text-3xl font-bold ${isError ? "text-red-600" : "text-green-600"}`}
                        >
                            {isSuccess && "Check your email address for the password reset link!"}
                            {isError && "Email address not found in database."}
                        </h3>
                    )}
                </form>
            </div>
        </main>
    )
}

export default ForgotPasswordForm
