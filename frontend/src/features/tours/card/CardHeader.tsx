import { SERVER_URL } from "../../../config.ts"

function CardHeader({ imageCover, name }: { imageCover: string; name: string }) {
    return (
        <div className="relative">
            <div className="h-64 w-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] sm:h-72 lg:h-80">
                <div className="absolute h-full w-full bg-linear-to-br from-green-800 to-green-600 opacity-45"></div>
                <img
                    className="h-full w-full object-cover"
                    src={`${SERVER_URL}img/tours/${imageCover}`}
                    alt={`${name} image cover`}
                />
            </div>
            <h3 className="absolute right-4 bottom-3 z-10 w-[78%] text-right text-[2.4rem] font-light text-white uppercase sm:right-6 sm:bottom-4 sm:w-[72%] sm:text-[2.4rem] lg:right-8 lg:text-[2.75rem]">
                <span className="rounded-sm bg-linear-to-br from-green-800 to-green-600 box-decoration-clone px-5 py-4 leading-normal opacity-90 lg:px-6">
                    {name}
                </span>
            </h3>
        </div>
    )
}

export default CardHeader
