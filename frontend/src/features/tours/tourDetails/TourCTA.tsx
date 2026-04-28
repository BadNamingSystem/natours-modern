import Logo from "../../../components/Logo.tsx"
import Button from "../../../components/Button.tsx"
import GradientLabel from "../../../components/GradientLabel.tsx"
import { SERVER_URL } from "../../../config.ts"
import { useCheckout } from "../../bookings/useCheckout.ts"
import { useNavigate } from "react-router"
import { useUser } from "../../user/useUser.ts"

type Props = {
    duration: number
    images: string[]
    tourId: string
}

function TourCta({ duration, images, tourId }: Props) {
    const { isAuthenticated } = useUser()
    const { checkout, isCheckingOut } = useCheckout()
    const navigate = useNavigate()

    const handleClick = () => {
        if (isAuthenticated) {
            checkout(tourId)
        } else {
            navigate("/login")
        }
    }

    return (
        <section className="mt-[-8vw] bg-gray-100 px-12 pt-160 pb-44 max-lg:px-4 max-lg:pt-16 max-lg:pb-16">
            <div className="relative mx-auto flex max-w-420 items-center overflow-hidden rounded-4xl bg-white py-36 pr-20 pl-100 shadow-2xl max-lg:flex-col max-lg:px-6 max-lg:py-12">
                {/* Overlapping Images & Logo */}
                <div className="absolute left-0 h-full w-120 overflow-hidden max-lg:relative max-lg:left-auto max-lg:mb-8 max-lg:h-40 max-lg:w-full">
                    <div className="absolute top-1/2 -left-8 z-30 flex h-64 w-64 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 p-12 shadow-lg max-lg:top-1/2 max-lg:left-1/2 max-lg:h-28 max-lg:w-28 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:p-6">
                        <Logo src="/logo-white.png" alt="Natours logo" />
                    </div>
                    <img
                        src={`${SERVER_URL}img/tours/${images[1]}`}
                        alt="Tour image"
                        className="absolute top-1/2 left-10 z-20 h-64 w-64 -translate-y-1/2 rounded-full object-cover shadow-lg [clip-path:circle(50%)] max-lg:left-1/2 max-lg:h-28 max-lg:w-28 max-lg:-translate-x-1/2"
                    />
                    <img
                        src={`${SERVER_URL}img/tours/${images[2]}`}
                        alt="Tour image"
                        className="absolute top-1/2 left-22 z-10 h-64 w-64 -translate-y-1/2 rounded-full object-cover shadow-lg [clip-path:circle(50%)] max-lg:left-[55%] max-lg:h-28 max-lg:w-28"
                    />
                </div>
                {/* CTA content */}
                <div className="grid grid-cols-[1fr_max-content] items-center gap-12 max-lg:grid-cols-1 max-lg:justify-items-center max-lg:gap-6 max-lg:text-center">
                    <div className="grid gap-0">
                        <GradientLabel>What are you waiting for?</GradientLabel>
                        <p className="-mt-14 text-[1.9rem] font-light text-stone-500 max-lg:-mt-6 max-lg:text-[1.5rem]">
                            {duration} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                    </div>
                    <div className="pl-12 max-lg:flex max-lg:justify-center max-lg:pl-0">
                        <Button
                            size="cta"
                            color="emerald"
                            round
                            ring
                            className="w-full uppercase hover:-translate-y-1 hover:shadow-2xl max-lg:w-auto max-lg:min-w-0"
                            onClick={handleClick}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut
                                ? "Connecting..."
                                : isAuthenticated
                                  ? "Book tour now!"
                                  : "Log in to book tour"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourCta
