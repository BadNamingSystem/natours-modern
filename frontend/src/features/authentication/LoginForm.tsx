import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import Button from "../../components/Button.tsx"
import { useLogin } from "./useLogin.ts"

function LoginForm() {
    const { login, isLoggingIn } = useLogin()

    function handleLogin(formData: FormData) {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        if (!email || !password) return

        login({ email, password })
    }

    return (
        <div className="max-w-220 rounded-md bg-white px-28 py-20">
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
                    className="px-12 py-8 text-3xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl"
                    round
                    disabled={isLoggingIn}
                >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
