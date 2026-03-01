import { Link } from "react-router"
import type { ReactNode } from "react"

function FooterLink({ children, path }: { children: ReactNode; path: string }) {
    return (
        <li className="font-sans text-base font-medium tracking-wide text-stone-500 transition-colors duration-300 hover:text-green-600 sm:text-lg">
            <Link className="" to={path}>
                {children}
            </Link>
        </li>
    )
}

export default FooterLink
