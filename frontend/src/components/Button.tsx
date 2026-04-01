import { Children } from "react"
import type { MouseEventHandler, ReactNode } from "react"
import { cn } from "../utils/cn.ts"

type Colors = "yellow" | "green" | "blue" | "red" | "violet" | "fuchsia" | "white" | "dark" | "emerald"
type Size = "small" | "medium" | "large" | "cta"

type Props = {
    children: ReactNode
    color?: Colors
    size?: Size
    ring?: boolean
    round?: boolean
    className?: string
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({
    children,
    color = "yellow",
    size = "medium",
    round = false,
    ring = false,
    disabled = false,
    className: customClassName = "",
    onClick,
}: Props) {
    const isIconOnly = Children.count(children) >= 1 && typeof children !== "string"

    const baseStyles =
        "font-sans cursor-pointer font-semibold transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"

    const colors = {
        yellow: "bg-yellow-400 text-stone-800 hover:bg-yellow-300 active:bg-yellow-400 focus:ring-yellow-400",
        green: "bg-green-500 text-stone-800 hover:bg-green-400 active:bg-green-500 focus:ring-green-500",
        blue: "bg-blue-500 text-stone-800 hover:bg-blue-400 active:bg-blue-500 focus:ring-blue-500",
        red: "bg-red-600 text-zinc-100 hover:bg-red-500 active:bg-red-600 focus:ring-red-600",
        violet: "bg-violet-700 text-zinc-200 hover:bg-violet-600 active:bg-violet-700 focus:ring-violet-700",
        fuchsia: "bg-fuchsia-400 text-stone-800 hover:bg-fuchsia-300 active:bg-fuchsia-400 focus:ring-fuchsia-400",
        white: "bg-stone-100 text-stone-800 hover:bg-stone-300 active:bg-stone-100 focus:ring-stone-900",
        dark: "bg-zinc-900 text-slate-100 hover:bg-zinc-700 active:bg-zinc-900 focus:ring-zinc-900",
        emerald: "bg-emerald-500 text-slate-50 active:bg-emerald-400 focus:ring-emerald-500",
    }

    const heights = {
        small: "h-8",
        medium: "h-11",
        large: "h-14",
        cta: "h-18",
    }

    const paddings = {
        small: "px-3 py-1",
        medium: "px-5",
        large: "px-10 py-8",
        cta: "px-14 py-10",
    }

    const textSizes = {
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
        cta: "text-2xl",
    }

    const roundStyles = round ? "rounded-full" : "rounded-md"
    const focusRing = ring ? "focus:outline-none focus:ring-2 focus:ring-offset-2" : ""
    const heightStyles = !isIconOnly ? heights[size] : ""
    const paddingStyles = isIconOnly ? "p-2.5" : paddings[size]

    const className = cn(
        baseStyles,
        colors[color],
        heights[size],
        textSizes[size],
        heightStyles,
        roundStyles,
        paddingStyles,
        focusRing,
        customClassName,
    )

    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
