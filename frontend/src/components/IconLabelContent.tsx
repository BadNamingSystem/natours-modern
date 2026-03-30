import type { ReactNode } from "react"

type Props = {
    icon: ReactNode
    children?: ReactNode
    content: string | number
}

function IconLabelContent({ icon, children, content }: Props) {
    return (
        <div className="mb-9 flex items-center justify-start gap-5">
            <span className="flex w-10 justify-center">{icon}</span>
            <span className="w-48 text-2xl font-semibold text-neutral-500 uppercase">{children}</span>
            <span className="text-2xl text-neutral-500 capitalize">{content}</span>
        </div>
    )
}

export default IconLabelContent
