import { X } from "lucide-react"
import type { MouseEventHandler } from "react"
import { cn } from "../utils/cn.ts"

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    ariaLabel?: string
    className?: string
}

function DeleteButton({ onClick, disabled, ariaLabel, className }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "cursor-pointer rounded-full bg-stone-200 p-2 text-slate-900 opacity-100 shadow-md transition-all duration-300 hover:text-red-500 md:pointer-events-none md:scale-80 md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:scale-100 md:group-hover:opacity-100",
                className,
            )}
            aria-label={ariaLabel}
        >
            <X className="h-8 w-8" />
        </button>
    )
}

export default DeleteButton
