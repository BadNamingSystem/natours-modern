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
        <main className="flex h-full grow items-center justify-center overflow-hidden bg-gray-100 px-4 py-10 text-stone-500 sm:px-6 sm:py-14 md:px-24 md:py-32">
            <div className="w-full max-w-176 rounded-md bg-white px-6 py-10 sm:px-8 sm:py-12 md:w-200 md:max-w-220 md:px-28 md:py-20">
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
                        className="w-full px-8 py-5 text-2xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-12 sm:py-8 sm:text-3xl"
                        round
                        ring
                        disabled={isPending}
                    >
                        <MoveRight />
                    </Button>

                    {(isSuccess || isError) && (
                        <h3
                            className={`mt-8 rounded-lg bg-gray-100 px-4 py-4 text-center text-[1.6rem] font-bold sm:mt-12 sm:px-6 sm:text-3xl ${isError ? "text-red-600" : "text-green-600"}`}
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
