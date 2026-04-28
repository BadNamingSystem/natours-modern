import { useEffect, useRef } from "react"

export function useOutsideClick<T extends HTMLElement>(handler: () => void, listenCapturing = true) {
    // This ref is intended to be attached to the DOM element that needs to be "watched" (e.g., a modal window).
    const ref = useRef<T>(null)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler()
            }
        }

        document.addEventListener("click", handleClick, listenCapturing)

        return () => document.removeEventListener("click", handleClick, listenCapturing)
    }, [handler, listenCapturing])

    return ref
}
