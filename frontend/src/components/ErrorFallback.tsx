import Button from "./Button.tsx"

function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
    const message = error instanceof Error ? error.message : String(error)

    return (
        <main className="flex h-screen items-center justify-center bg-gray-50 p-18">
            <div className="flex-[0_1_96rem] rounded-md border border-gray-100 bg-white p-18 text-center">
                <h1 className="mb-6">⛔ Something went wrong ⛔</h1>
                <p className="mb-14 bg-gray-500 font-sans">{message}</p>
                <Button color="red" onClick={resetErrorBoundary}>
                    Try again
                </Button>
            </div>
        </main>
    )
}

export default ErrorFallback
