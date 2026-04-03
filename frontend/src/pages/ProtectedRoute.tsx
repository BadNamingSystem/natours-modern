import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router"
import { useUser } from "../features/authentication/useUser"
import FullPage from "../components/FullPage.tsx"
import Spinner from "../components/Spinner.tsx"

function ProtectedRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const { isPending, isAuthenticated } = useUser()

    // Redirect if not authenticated AND not loading
    useEffect(() => {
        if (!isAuthenticated && !isPending) navigate("/login")
    }, [isAuthenticated, isPending, navigate])

    if (isPending)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        )

    // If authenticated, render children
    if (isAuthenticated) return children
}
export default ProtectedRoute
