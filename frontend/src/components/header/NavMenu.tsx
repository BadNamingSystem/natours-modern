import Button from "../Button.tsx"
import NavigationLink from "./NavigationLink.tsx"
import { useUser } from "../../features/authentication/useUser.ts"
import { useLogout } from "../../features/authentication/useLogout.ts"
import Avatar from "../Avatar.tsx"

function NavMenu() {
    const { isAuthenticated, name, photo } = useUser()
    const { logout, isPending } = useLogout()

    return (
        <nav className="mr-8 uppercase md:mr-16">
            <ul className="flex list-none flex-row items-center gap-6 text-2xl font-light text-gray-100 sm:gap-12">
                {isAuthenticated ? (
                    <>
                        <NavigationLink path="/me" className="flex items-center gap-2">
                            <Avatar src={`/users/${photo || "default.jpg"}`} alt="user photo" /> <span>{name}</span>
                        </NavigationLink>
                        <Button
                            color="red"
                            size="large"
                            round
                            disabled={isPending}
                            onClick={() => logout()}
                            className="text-2xl font-medium uppercase"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <NavigationLink path="/login">Login</NavigationLink>
                        <NavigationLink path="/signup">Signup</NavigationLink>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavMenu
