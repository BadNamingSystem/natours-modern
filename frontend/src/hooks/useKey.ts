import { useEffect } from "react"

export function useKey(key: string, action: () => void) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action?.()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [key, action])
}
