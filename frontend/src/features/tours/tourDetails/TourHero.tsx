import { Clock, MapPin } from "lucide-react"

type Props = {
    name: string
    imageCover: string
    duration: number
    startingFrom: string
}

function TourHero({ name, imageCover, duration, startingFrom }: Props) {
    return (
        <section className="relative h-[38vw] [clip-path:polygon(0_0,100%_0,100%_83%,0_100%)]">
            {/* Background image + overlay */}
            <div className="h-full">
                <div className="absolute h-full w-full bg-linear-to-br from-green-800 to-green-600 opacity-45"></div>
                <img className="h-full w-full object-cover" src={`/tours/${imageCover}`} alt={`${name} image cover`} />
            </div>

            <div className="absolute top-[45%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="mx-auto mb-10 w-4xl text-center text-[5rem] leading-[1.4] font-light tracking-[1rem] uppercase">
                    <span className="rounded-md bg-linear-to-br from-green-800 to-green-600 [box-decoration-break:clone] px-6 py-2 [-webkit-box-decoration-break:clone]">
                        {name} Tour
                    </span>
                </h1>

                <div className="flex items-center justify-center gap-10 text-2xl font-bold tracking-widest uppercase drop-shadow-md">
                    <div className="flex items-center gap-3">
                        <Clock />
                        <span>{duration} days</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin />
                        <span>{startingFrom}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TourHero
