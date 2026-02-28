import { NavLink } from "react-router"
import type { ReactNode } from "react"

function NavigationLink({ children, path }: { children: ReactNode; path: string }) {
    return (
        <li className="transition-transform duration-300 hover:-translate-y-2">
            <NavLink className="" to={path}>
                {children}
            </NavLink>
        </li>
    )
}

export default NavigationLink
