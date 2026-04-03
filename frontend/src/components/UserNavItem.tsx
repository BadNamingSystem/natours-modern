import { NavLink } from "react-router"
import type { ReactNode } from "react"

function UserNavItem({ path, icon, label }: { path: string; icon: ReactNode; label: string }) {
    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `mb-6 flex items-center gap-6 rounded-md border-l-4 px-16 py-8 text-white transition-all duration-300 hover:translate-x-2 hover:border-l-white ${isActive ? "border-l-white bg-white/10" : "border-l-transparent"} `
                }
            >
                {icon}
                <span className="text-2xl font-normal tracking-widest uppercase">{label}</span>
            </NavLink>
        </li>
    )
}

export default UserNavItem
