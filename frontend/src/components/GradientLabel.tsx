import type { ReactNode } from "react"

function GradientLabel({ children }: { children: ReactNode }) {
    return (
        <h2 className="mb-14 bg-linear-to-r from-green-400 to-green-700 bg-clip-text text-4xl leading-tight font-semibold tracking-[0.1rem] text-transparent uppercase">
            {children}
        </h2>
    )
}

export default GradientLabel
