import { Briefcase, CreditCard, Settings, Star } from "lucide-react"
import UserNavItem from "../../components/UserNavItem.tsx"
import { Outlet } from "react-router"

function UserSettings() {
    return (
        <main className="px-24 py-32">
            <div className="mx-auto flex min-h-screen max-w-480 overflow-hidden rounded-md bg-white shadow-2xl">
                <nav className="shrink-0 grow-0 basis-lg bg-linear-to-br from-emerald-600 to-emerald-400 py-16">
                    <ul className="list-none">
                        <UserNavItem path="/me" icon={<Settings />} label="Settings" />
                        <UserNavItem path="/me/bookings" icon={<Briefcase />} label="My Bookings" />
                        <UserNavItem path="/me/reviews" icon={<Star />} label="My Reviews" />
                        <UserNavItem path="/me/billing" icon={<CreditCard />} label="Billing" />
                    </ul>
                </nav>
                <div className="shrink grow basis-0 py-28 text-stone-500">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default UserSettings
