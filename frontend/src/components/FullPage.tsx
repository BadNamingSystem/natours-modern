import type { ReactNode } from "react"

function FullPage({ children }: { children: ReactNode }) {
    return <div className="flex h-screen items-center justify-center">{children}</div>
}

export default FullPage
