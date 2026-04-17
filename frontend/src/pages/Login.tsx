import LoginForm from "../features/authentication/LoginForm.tsx"

function Login() {
    return (
        <main className="flex h-full grow items-center justify-center overflow-hidden bg-gray-100 px-4 py-10 text-stone-500 sm:px-6 sm:py-14 md:px-24 md:py-32">
            <LoginForm />
        </main>
    )
}

export default Login
