import Logo from "../Logo.tsx"
import NavMenu from "./NavMenu.tsx"
import { Link } from "react-router"

function Header() {
    return (
        <header className="flex h-32 flex-row items-center justify-between bg-neutral-700 sm:rounded-sm">
            <div className="ml-8 transition-transform duration-300 hover:-translate-y-2 md:ml-16">
                <Link className="font-sans text-2xl font-light text-gray-100" to="/">
                    ALL TOURS
                </Link>
            </div>
            <Logo src="/logo-white.png" alt="natours header logo" className="hidden sm:flex" />
            <NavMenu />
        </header>
    )
}

export default Header
