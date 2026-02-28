import Logo from "../Logo.tsx"
import FooterLink from "./FooterLink.tsx"

function Footer() {
    return (
        <footer className="sticky flex h-32 flex-row items-center justify-between">
            <Logo className="ml-16" src="/logo-green.png" alt="natours footer logo" />
            <div className="mr-16">
                <ul className="flex list-none flex-row items-center gap-12 font-sans">
                    <FooterLink path="#">About Us</FooterLink>
                    <FooterLink path="#">Download App</FooterLink>
                    <FooterLink path="#">Become a guide</FooterLink>
                    <FooterLink path="#">Careers</FooterLink>
                    <FooterLink path="#">Contact</FooterLink>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
