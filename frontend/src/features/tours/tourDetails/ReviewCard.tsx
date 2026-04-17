import type { Review } from "../../../types/types.ts"
import { SERVER_URL } from "../../../config.ts"

function ReviewCard({ review }: { review: Review }) {
    const {
        user: { name, photo },
        review: text,
        rating,
    } = review

    return (
        <li className="flex w-120 shrink-0 snap-center flex-col items-center rounded-sm bg-stone-50 p-16 shadow-xl max-lg:w-80 max-lg:p-8">
            <div className="mb-8 flex items-center gap-6 max-lg:mb-6 max-lg:gap-4">
                <img
                    src={`${SERVER_URL}img/users/${photo}`}
                    alt={`Avatar of ${name}`}
                    className="h-16 w-16 rounded-full max-lg:h-14 max-lg:w-14"
                />
                <h6 className="text-[1.5rem] font-bold text-stone-600 uppercase max-lg:text-[1.3rem]">{name}</h6>
            </div>
            <p className="mb-8 text-center text-[1.5rem] font-light text-stone-600 italic max-lg:mb-6 max-lg:text-[1.4rem]">&ldquo;{text}&rdquo;</p>
            <div className="mt-auto flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className={`h-8 w-8 max-lg:h-6 max-lg:w-6 ${star <= rating ? "fill-green-500" : "fill-stone-400"}`}>
                        <use xlinkHref={`/icons.svg#icon-star`} />
                    </svg>
                ))}
            </div>
        </li>
    )
}

export default ReviewCard
