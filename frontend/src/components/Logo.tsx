import { cn } from "../utils/cn.ts"

type Props = {
    src: string
    alt: string
    className?: string
}

function Logo({ src, alt, className }: Props) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <img className="h-14" src={src} alt={alt} />
        </div>
    )
}

export default Logo
