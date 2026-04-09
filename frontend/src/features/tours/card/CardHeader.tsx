import { SERVER_URL } from "../../../config.ts"

function CardHeader({ imageCover, name }: { imageCover: string; name: string }) {
    return (
        <div className="relative">
            <div className="h-88 w-full overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
                <div className="absolute h-full w-full bg-linear-to-br from-green-800 to-green-600 opacity-45"></div>
                <img className="h-full w-full object-cover" src={`${SERVER_URL}img/tours/${imageCover}`} alt={`${name} image cover`} />
            </div>
            <h3 className="absolute right-8 bottom-4 z-10 w-[70%] text-right text-[2.75rem] font-light text-white uppercase">
                <span className="rounded-sm bg-linear-to-br from-green-800 to-green-600 box-decoration-clone px-6 py-4 leading-normal opacity-90">
                    {name}
                </span>
            </h3>
        </div>
    )
}

export default CardHeader
