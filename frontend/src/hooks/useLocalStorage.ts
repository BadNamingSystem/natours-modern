import { type Dispatch, type SetStateAction, useEffect, useState } from "react"

export function useLocalStorage<T>(initialState: T, key: string): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key)
        if (!storedValue) return initialState

        try {
            return JSON.parse(storedValue) as T
        } catch (e) {
            console.error(e)
            return initialState
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
