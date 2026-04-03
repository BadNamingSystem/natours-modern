import { Outlet } from "react-router"
import Header from "./header/Header.tsx"
import Footer from "./footer/Footer.tsx"

function BaseLayout() {
    return (
        <div className="flex min-h-screen flex-col rounded-sm">
            <Header />
            <main className="grow bg-gray-100">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default BaseLayout
