import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { DarkModeProvider } from "./context/DarkModeContext.tsx"
import { BrowserRouter } from "react-router"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./components/ErrorFallback.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 0, retry: false } } })

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
            <DarkModeProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </QueryClientProvider>
            </DarkModeProvider>
        </ErrorBoundary>
    </StrictMode>,
)
