import Button from "./Button.tsx"

function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
    const message = error instanceof Error ? error.message : String(error)

    return (
        <main className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gray-200 p-18">
            <div className="flex flex-col items-center justify-center gap-6 rounded-md border border-gray-100 bg-white p-18 text-center shadow-2xl">
                <h1 className="mb-6 text-4xl md:text-5xl">⛔ Something went wrong ⛔</h1>
                <p className="mb-14 rounded-md bg-rose-300 p-4 font-sans text-lg md:text-2xl">{message}</p>
                <Button
                    color="red"
                    onClick={resetErrorBoundary}
                    className="transition-transform hover:scale-105 active:scale-95 md:px-10 md:py-8 md:text-2xl"
                >
                    Try again
                </Button>
            </div>
        </main>
    )
}

export default ErrorFallback
