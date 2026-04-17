import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { useLogin } from "./useLogin.ts"
import { Link } from "react-router"

function LoginForm() {
    const { login, isLoggingIn } = useLogin()

    function handleLogin(formData: FormData) {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        if (!email || !password) return

        login({ email, password })
    }

    return (
        <div className="w-full max-w-208 rounded-md bg-white px-6 py-10 sm:px-10 sm:py-12 md:w-200 md:max-w-220 md:px-28 md:py-20">
            <GradientLabel>Log into your account</GradientLabel>
            <form action={handleLogin}>
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
                <Button
                    size="large"
                    color="emerald"
                    className="w-full px-8 py-5 text-2xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl sm:w-auto sm:px-12 sm:py-8 sm:text-3xl"
                    round
                    ring
                    disabled={isLoggingIn}
                >
                    Login
                </Button>
                <Link
                    to="/forgot-password"
                    className="mt-8 block text-[1.6rem] italic hover:text-green-500 sm:mt-12 sm:text-2xl"
                >
                    Forgot your password?
                </Link>
            </form>
        </div>
    )
}

export default LoginForm
