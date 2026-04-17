import { Briefcase, CreditCard, Settings, Star } from "lucide-react"
import UserNavItem from "../../components/UserNavItem.tsx"
import { Outlet } from "react-router"

function UserSettings() {
    return (
        <main className="px-4 py-4 sm:px-6 sm:py-6 md:px-24 md:py-32">
            <div className="mx-auto flex min-h-screen max-w-480 flex-col overflow-hidden rounded-md bg-white shadow-2xl md:flex-row">
                <nav className="shrink-0 grow-0 basis-lg bg-linear-to-br from-emerald-600 to-emerald-400 py-4 sm:py-6 md:py-16">
                    <ul className="list-none md:py-0">
                        <UserNavItem path="/me" icon={<Settings />} label="Settings" />
                        <UserNavItem path="/me/bookings" icon={<Briefcase />} label="My Bookings" />
                        <UserNavItem path="/me/reviews" icon={<Star />} label="My Reviews" />
                        <UserNavItem path="/me/billing" icon={<CreditCard />} label="Billing" />
                    </ul>
                </nav>
                <div className="shrink grow basis-0 px-4 py-8 text-stone-500 sm:px-6 sm:py-10 md:px-0 md:py-28">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default UserSettings
