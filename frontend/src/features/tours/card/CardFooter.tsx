import Button from "../../../components/Button.tsx"
import { useNavigate } from "react-router"

type Props = {
    slug: string
    price: number
    ratingsAverage: number
    ratingsQuantity: number
}

function CardFooter({ slug, price, ratingsAverage, ratingsQuantity }: Props) {
    const navigate = useNavigate()

    return (
        <div className="mt-auto flex flex-col gap-4 border-t border-stone-200 bg-olive-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-2 text-base sm:text-lg lg:text-xl">
                <p>
                    <span className="font-bold text-neutral-600">{`$${price} `}</span>
                    <span className="text-neutral-500">per person</span>
                </p>
                <p>
                    <span className="font-bold text-neutral-600">{ratingsAverage}</span>
                    <span className="text-neutral-500">{` rating (${ratingsQuantity})`}</span>
                </p>
            </div>

            <Button
                color="emerald"
                round
                size="large"
                className="w-full px-8 py-4 text-white hover:-translate-y-1 hover:shadow-lg active:translate-y-0 sm:w-auto sm:px-10 lg:px-12 lg:py-5"
                onClick={() => navigate(`/tours/${slug}`)}
            >
                DETAILS
            </Button>
        </div>
    )
}

export default CardFooter
