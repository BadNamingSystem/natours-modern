import {
    cloneElement,
    createContext,
    type Dispatch,
    type ReactElement,
    type ReactNode,
    type SetStateAction,
    useContext,
    useState,
} from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useOutsideClick } from "../hooks/useOutsideClick.ts"
import { useKey } from "../hooks/useKey.ts"
import { cn } from "../utils/cn.ts"

type ModalContextProps = {
    openName: string
    close: () => void
    open: Dispatch<SetStateAction<string>>
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

function Modal({ children }: { children: ReactNode }) {
    // string ID to track the currently opened window
    const [openName, setOpenName] = useState("")

    const close = () => setOpenName("")
    const open = setOpenName

    return <ModalContext.Provider value={{ openName, close, open }}>{children}</ModalContext.Provider>
}

type OpenProps = { children: ReactElement; opens: string }
type OpenChildProps = { onClick?: () => void }

function Open({ children, opens: opensWindowName }: OpenProps) {
    const { open } = useModalContext()

    return cloneElement(children as ReactElement<OpenChildProps>, { onClick: () => open(opensWindowName) })
}

type WindowProps = { children: ReactElement; name: string; className?: string }
type WindowChildProps = { onCloseModal?: () => void }

function Window({ children, name, className }: WindowProps) {
    const { openName, close } = useModalContext()
    const ref = useOutsideClick<HTMLDivElement>(close)
    useKey("Escape", close)

    // It checks if its name prop matches the current openName in context
    if (name !== openName) return null

    return createPortal(
        <div className="fixed inset-0 z-1000 flex h-screen w-full items-center justify-center bg-black/30 px-4 backdrop-blur-xs transition-all duration-500 sm:px-6">
            <div
                ref={ref}
                className={cn(
                    "relative w-full max-w-2xl rounded-lg bg-gray-50 p-6 shadow-lg transition-all duration-500 sm:p-8",
                    className,
                )}
            >
                <button
                    onClick={close}
                    className="absolute top-4 right-4 rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-200 sm:top-5 sm:right-5"
                >
                    <X className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-200" />
                </button>

                <div>{cloneElement(children as ReactElement<WindowChildProps>, { onCloseModal: close })}</div>
            </div>
        </div>,
        document.body,
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal

function useModalContext() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("Modal components must be used within a ModalContext")
    }
    return context
}
