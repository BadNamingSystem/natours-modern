import { NavLink } from "react-router"
import type { ReactNode } from "react"

function NavigationLink({ children, path, className }: { children: ReactNode; path: string; className?: string }) {
    return (
        <li className="transition-transform duration-300 hover:-translate-y-2 backface-hidden transform-[translateZ(0)]">
            <NavLink className={className} to={path}>
                {children}
            </NavLink>
        </li>
    )
}

export default NavigationLink
