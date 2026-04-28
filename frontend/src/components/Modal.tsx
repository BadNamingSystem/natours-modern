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

type WindowProps = { children: ReactElement; name: string }
type WindowChildProps = { onCloseModal?: () => void }

function Window({ children, name }: WindowProps) {
    const { openName, close } = useModalContext()
    const ref = useOutsideClick<HTMLDivElement>(close)
    useKey("Escape", close)

    // It checks if its name prop matches the current openName in context
    if (name !== openName) return null

    return createPortal(
        <div className="fixed inset-0 z-1000 h-screen w-full bg-black/30 backdrop-blur-xs transition-all duration-500">
            <div
                ref={ref}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-10 shadow-lg transition-all duration-500"
            >
                <button
                    onClick={close}
                    className="absolute top-5 right-8 translate-x-2 rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-200"
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
