import Button from "../Button.tsx"
import NavigationLink from "./NavigationLink.tsx"

function NavMenu() {
    return (
        <nav className="mr-8 md:mr-16">
            <ul className="flex list-none flex-row items-center gap-6 font-sans text-2xl font-light text-gray-100 uppercase sm:gap-12">
                <NavigationLink path="/login">Login</NavigationLink>
                <NavigationLink path="/signup">Signup</NavigationLink>
                <NavigationLink path="/account">Account</NavigationLink>

                <Button color="red" size="large" round className="text-2xl font-medium uppercase">
                    Logout
                </Button>
            </ul>
        </nav>
    )
}

export default NavMenu
