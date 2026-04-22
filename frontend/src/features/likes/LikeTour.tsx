import { Heart } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "../../utils/cn.ts"

type Props = {
    likesCount: number
    liked: boolean
    isLoading?: boolean
    className?: string
} & ComponentPropsWithoutRef<"button">

function LikeTour({ likesCount, liked, isLoading, className, ...props }: Props) {
    return (
        <button
            type="button"
            className={cn(
                "absolute top-8 right-8 z-20 flex min-w-36 cursor-pointer items-center justify-center gap-5 rounded-full bg-white/20 px-8 py-5 text-[1.8rem] font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white/30 max-lg:top-4 max-lg:right-4 max-lg:min-w-0 max-lg:gap-3 max-lg:px-5 max-lg:py-3 max-lg:text-2xl",
                className,
            )}
            disabled={isLoading}
            aria-label={`${liked ? "Unlike" : "Like"} this tour, currently ${likesCount} likes`}
            {...props}
        >
            <Heart
                className={cn(
                    "h-9 w-9 max-lg:h-6 max-lg:w-6",
                    liked ? "fill-red-500 text-red-500" : "fill-none text-white",
                )}
            />
            <span>{likesCount}</span>
        </button>
    )
}

export default LikeTour
