import { createContext, type ReactNode, useContext, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage.ts"

type ContextType = {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const DarkModeContext = createContext<ContextType | undefined>(undefined)

function DarkModeProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorage(
        window.matchMedia("(prefer-color-scheme: dark)").matches,
        "isDarkMode",
    )

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    const toggleDarkMode = () => setIsDarkMode(isDark => !isDark)

    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

function useDarkMode() {
    const context = useContext(DarkModeContext)
    if (context === undefined) throw new Error("DarkModeContext is being used outside of DarkModeProvider")

    return context
}

export { DarkModeProvider, useDarkMode }
