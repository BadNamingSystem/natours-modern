import type { Review } from "../../../types/types.ts"

function ReviewCard({ review }: { review: Review }) {
    const {
        user: { name, photo },
        review: text,
        rating,
    } = review

    return (
        <li className="flex w-120 shrink-0 snap-center flex-col items-center rounded-sm bg-stone-50 p-16 shadow-xl">
            <div className="mb-8 flex items-center gap-6">
                <img
                    src={`/users/${photo || "default.jpg"}`}
                    alt={`Avatar of ${name}`}
                    className="h-16 w-16 rounded-full"
                />
                <h6 className="text-[1.5rem] font-bold text-stone-600 uppercase">{name}</h6>
            </div>
            <p className="mb-8 text-center text-[1.5rem] font-light text-stone-600 italic">&ldquo;{text}&rdquo;</p>
            <div className="mt-auto flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className={`h-8 w-8 ${star <= rating ? "fill-green-500" : "fill-stone-400"}`}>
                        <use xlinkHref={`/icons.svg#icon-star`} />
                    </svg>
                ))}
            </div>
        </li>
    )
}

export default ReviewCard
