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
                "pointer-events-none scale-80 cursor-pointer rounded-full bg-stone-200 p-2 text-slate-900 opacity-0 shadow-md transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 hover:text-red-500",
                className,
            )}
            aria-label={ariaLabel}
        >
            <X className="h-8 w-8" />
        </button>
    )
}

export default DeleteButton
