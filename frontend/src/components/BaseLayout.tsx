import { Outlet } from "react-router"
import Header from "./header/Header.tsx"
import Footer from "./footer/Footer.tsx"

function BaseLayout() {
    return (
        <div className="rounded-sm bg-gray-100">
            <Header />
            <main className="h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default BaseLayout
