import { Link } from "react-router"

type Props = {
    price: number
    ratingsAverage: number
    ratingsQuantity: number
}

function CardFooter({ price, ratingsAverage, ratingsQuantity }: Props) {
    return (
        <div className="mt-auto flex items-center justify-between border-t border-stone-200 bg-olive-100 px-10 py-10">
            <div className="flex flex-col gap-2 text-xl">
                <p>
                    <span className="font-bold text-neutral-600">{`$${price} `}</span>
                    <span className="text-neutral-500">per person</span>
                </p>
                <p>
                    <span className="font-bold text-neutral-600">{ratingsAverage}</span>
                    <span className="text-neutral-500">{` rating (${ratingsQuantity})`}</span>
                </p>
            </div>

            <Link
                className="rounded-full bg-emerald-600 px-12 py-5 text-xl font-light tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                to="#"
            >
                DETAILS
            </Link>
        </div>
    )
}

export default CardFooter
