import Logo from "../Logo.tsx"
import FooterLink from "./FooterLink.tsx"

function Footer() {
    return (
        <footer className="flex h-40 flex-row items-center justify-center bg-gray-100 sm:h-56 sm:justify-between">
            <Logo className="mb-6 ml-4 hidden sm:flex md:ml-16" src="/logo-green.png" alt="natours footer logo" />
            <div className="sm:mr-8 md:mr-24">
                <ul className="flex list-none flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12">
                    <FooterLink path="https://github.com/BadNamingSystem/natours-modern">Github</FooterLink>
                    <FooterLink path="#">Download App</FooterLink>
                    <FooterLink path="#">Become a guide</FooterLink>
                    <FooterLink path="#">Careers</FooterLink>
                    <FooterLink path="#">Contact</FooterLink>
                </ul>
                <p className="mt-4 text-center text-lg text-stone-500 italic sm:text-right sm:text-xl md:text-2xl">
                    &copy; {new Date().getFullYear()} · Inspired by{" "}
                    <a target="_blank" className="font-semibold underline" href="https://natours.dev/">
                        Natours
                    </a>{" "}
                    from Jonas Schmedtmann
                </p>
            </div>
        </footer>
    )
}

export default Footer
