import Logo from "../Logo.tsx"
import FooterLink from "./FooterLink.tsx"

function Footer() {
    return (
        <footer className="flex h-32 flex-row items-center justify-center bg-gray-100 sm:justify-between">
            <Logo className="mb-6 ml-8 hidden sm:flex md:ml-16" src="/logo-green.png" alt="natours footer logo" />
            <div className="mr-8 md:mr-16">
                <ul className="flex list-none flex-row items-center gap-6 font-sans md:gap-12">
                    <FooterLink path="#">About Us</FooterLink>
                    <FooterLink path="#">Download App</FooterLink>
                    <FooterLink path="#">Become a guide</FooterLink>
                    <FooterLink path="#">Careers</FooterLink>
                    <FooterLink path="#">Contact</FooterLink>
                </ul>
                <p className="text-sans mt-4 text-center text-base text-stone-400 italic sm:text-right sm:text-lg">
                    &copy; {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}

export default Footer
