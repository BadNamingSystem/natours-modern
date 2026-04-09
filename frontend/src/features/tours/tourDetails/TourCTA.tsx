import Logo from "../../../components/Logo.tsx"
import Button from "../../../components/Button.tsx"
import GradientLabel from "../../../components/GradientLabel.tsx"
import { SERVER_URL } from "../../../config.ts"

function TourCta({ duration, images }: { duration: number; images: string[] }) {
    return (
        <section className="mt-[-8vw] bg-gray-100 px-12 pt-160 pb-44">
            <div className="relative mx-auto flex max-w-420 items-center overflow-hidden rounded-4xl bg-white py-36 pr-20 pl-100 shadow-2xl">
                {/* Overlapping Images & Logo */}
                <div className="absolute left-0 h-full w-120 overflow-hidden">
                    <div className="absolute top-1/2 -left-8 z-30 flex h-64 w-64 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 p-12 shadow-lg">
                        <Logo src="/logo-white.png" alt="Natours logo" />
                    </div>
                    <img
                        src={`${SERVER_URL}img/tours/${images[1]}`}
                        alt="Tour image"
                        className="absolute top-1/2 left-10 z-20 h-64 w-64 -translate-y-1/2 rounded-full object-cover shadow-lg [clip-path:circle(50%)]"
                    />
                    <img
                        src={`${SERVER_URL}img/tours/${images[2]}`}
                        alt="Tour image"
                        className="absolute top-1/2 left-22 z-10 h-64 w-64 -translate-y-1/2 rounded-full object-cover shadow-lg [clip-path:circle(50%)]"
                    />
                </div>
                {/* CTA content */}
                <div className="grid grid-cols-[1fr_max-content] items-center gap-12">
                    <div className="grid gap-0">
                        <GradientLabel>What are you waiting for?</GradientLabel>
                        <p className="-mt-14 text-[1.9rem] font-light text-stone-500">
                            {duration} days. 1 adventure. Infinite memories. Make it yours today!
                        </p>
                    </div>
                    <div className="pl-12">
                        <Button
                            size="cta"
                            color="emerald"
                            round
                            ring
                            className="uppercase hover:-translate-y-1 hover:shadow-2xl"
                        >
                            Book tour now!
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourCta
