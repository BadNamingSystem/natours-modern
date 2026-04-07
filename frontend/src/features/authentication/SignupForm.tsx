import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { useSignup } from "./useSignup.ts"
import toast from "react-hot-toast"

function SignupForm() {
    const { signup, isSigningUp } = useSignup()

    function handleSignup(formData: FormData) {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const passwordConfirm = formData.get("passwordConfirm") as string

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match")
            return
        }

        signup({ name, email, password, passwordConfirm })
    }

    return (
        <div className="w-200 max-w-220 rounded-md bg-white px-28 py-20">
            <GradientLabel>Create your account</GradientLabel>
            <form action={handleSignup}>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Full name"
                    placeholder="John/Jane Doe"
                    minLength={2}
                    required
                />
                <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="you@example.com"
                    autoComplete="username"
                    required
                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={8}
                />
                <Input
                    type="password"
                    minLength={8}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    autoComplete="new-password"
                    label="Confirm password"
                    placeholder="••••••••"
                    required
                />
                <Button
                    size="large"
                    color="emerald"
                    className="px-12 py-8 text-3xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl"
                    round
                    ring
                    disabled={isSigningUp}
                >
                    Signup
                </Button>
            </form>
        </div>
    )
}

export default SignupForm
