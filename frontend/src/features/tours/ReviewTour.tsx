import { cn } from "../../utils/cn.ts"
import type { ComponentPropsWithoutRef } from "react"
import { SquarePen } from "lucide-react"

type Props = {
    className?: string
} & ComponentPropsWithoutRef<"button">

function ReviewTour({ className, ...props }: Props) {
    return (
        <button
            type="button"
            className={cn(
                "group absolute z-20 flex min-w-0 items-center justify-center overflow-hidden rounded-full bg-white/20 px-6 py-3 text-2xl text-white backdrop-blur-md transition-all duration-300 lg:min-w-36 lg:px-8 lg:py-5",
                "cursor-pointer hover:min-w-60 hover:bg-white/30",
                className,
            )}
            {...props}
        >
            <SquarePen className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 duration-300 group-hover:ml-4 group-hover:max-w-40 group-hover:opacity-100">
                Leave a review
            </span>
        </button>
    )
}

export default ReviewTour
