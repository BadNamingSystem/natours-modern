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

            <Button
                color="emerald"
                round
                size="large"
                className="px-12 py-5 text-white hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
                onClick={() => navigate(`/tours/${slug}`)}
            >
                DETAILS
            </Button>
        </div>
    )
}

export default CardFooter
