import { useMoveBack } from "../hooks/useMoveBack.ts"
import Button from "../components/Button.tsx"

function PageNotFound() {
    const moveBack = useMoveBack()

    return (
        <main className="flex h-screen flex-col items-center justify-center gap-12 overflow-hidden bg-gray-100">
            <h1 className="font-sans text-3xl font-medium tracking-wide md:text-5xl">
                The page you are looking for does not exist
            </h1>
            <div>
                <Button size="large" color="green" onClick={moveBack} className="text-2xl font-medium">
                    Go Back
                </Button>
            </div>
        </main>
    )
}

export default PageNotFound
