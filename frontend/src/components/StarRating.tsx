import { type CSSProperties, useState } from "react"

const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "0.5rem 1rem",
} as CSSProperties

const starContainerStyle = {
    display: "flex",
} as CSSProperties

type StarRatingProps = {
    maxRating?: number
    color?: string
    size?: number
    className?: string
    messages?: string[]
    defaultRating?: number
    onSetRating?: (rating: number) => void
}

export default function StarRating({
    maxRating = 5,
    color = "#FCC419",
    size = 48,
    className = "",
    messages = [],
    defaultRating = 0,
    onSetRating,
}: StarRatingProps) {
    const [tempRating, setTempRating] = useState(0)
    const [rating, setRating] = useState(defaultRating)

    const handleRating = (rating: number) => {
        setRating(rating)
        onSetRating?.(rating)
    }

    const textStyle = {
        color,
        fontSize: `${size / 1.5}px`,
        lineHeight: "1",
        margin: "0",
        minWidth: `${size}px`, // Reserve space to prevent layout shift
    } as CSSProperties

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        color={color}
                        size={size}
                        key={i}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages?.length === maxRating
                    ? messages[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    )
}

type StarProps = {
    onRate: () => void
    onHoverIn: () => void
    onHoverOut: () => void
    full: boolean
    color: string
    size: number
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }: StarProps) {
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
    } as CSSProperties

    return (
        <span role="button" style={starStyle} onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={full ? color : "none"} viewBox="0 0 24 24" stroke={color}>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        </span>
    )
}
