import { SERVER_URL } from "../../../config.ts"

function TourPhotos({ images }: { images: string[] }) {
    return (
        <section className="relative z-50 mt-[-6vw] flex h-[30vw] [clip-path:polygon(0_8vw,100%_0,100%_calc(100%-8vw),0_100%)]">
            {/* PHOTO 1 */}
            <div className="w-1/3">
                <img className="h-full w-full object-cover" src={`${SERVER_URL}img/tours/${images[0]}`} alt="Tour photo 1" />
            </div>

            {/* PHOTO 2 */}
            <div className="w-1/3">
                <img className="h-full w-full object-cover" src={`${SERVER_URL}img/tours/${images[1]}`} alt="Tour photo 2" />
            </div>

            {/* PHOTO 3 */}
            <div className="w-1/3 overflow-hidden">
                <img className="h-full w-full -translate-y-4 scale-105 object-cover" src={`${SERVER_URL}img/tours/${images[2]}`} alt="Tour photo 3" />
            </div>
        </section>
    )
}

export default TourPhotos
