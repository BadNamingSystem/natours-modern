import { useState, useRef } from "react"
import { X } from "lucide-react"
import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import { useUser } from "./useUser.ts"
import { SERVER_URL } from "../../config.ts"
import Avatar from "../../components/Avatar.tsx"
import Button from "../../components/Button.tsx"
import { useUpdateMe } from "./useUpdateMe.ts"
import toast from "react-hot-toast"

function UpdateUserDataForm() {
    const { fullName, email, photo, canModify } = useUser()
    const { updateMe, isUpdatingMe } = useUpdateMe()
    const [selectedFileName, setSelectedFileName] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleClearPhoto() {
        setSelectedFileName("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    function handleUpdateUserData(formData: FormData) {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const photo = formData.get("photo") as File

        if (!name || !email) return

        if (!canModify) {
            toast.error("Cannot modify a test account")
            return
        }

        updateMe({ name, email, photo })
    }

    return (
        <div className="mx-auto max-w-272 px-32">
            <GradientLabel>Your account settings</GradientLabel>
            <form action={handleUpdateUserData}>
                <Input type="text" defaultValue={fullName} id="name" name="name" label="Name" />
                <Input type="text" defaultValue={email} id="email" name="email" label="Email address" />
                <div className="mb-12 flex items-center gap-8 py-4">
                    <Avatar
                        src={`${SERVER_URL}img/users/${photo}`}
                        alt={`photo of ${fullName}`}
                        className="h-40 w-40 shrink-0"
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        id="photo"
                        name="photo"
                        className="hidden"
                        onChange={e => setSelectedFileName(e.target.files?.[0]?.name || "")}
                    />
                    {!selectedFileName && (
                        <label
                            htmlFor="photo"
                            className="cursor-pointer border-b border-emerald-500 px-3 py-2 text-[1.8rem] text-emerald-500 transition-colors duration-400 hover:bg-emerald-500 hover:text-white"
                        >
                            Choose new photo
                        </label>
                    )}
                    {selectedFileName && (
                        <div className="flex items-center gap-2 pr-2">
                            <p className="text-2xl text-stone-500 italic">Selected: {selectedFileName}</p>
                            <button
                                type="button"
                                onClick={handleClearPhoto}
                                className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-colors hover:bg-stone-200 hover:text-red-500"
                                title="Clear selection"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="mt-10 flex justify-end">
                    <Button
                        size="large"
                        color="emerald"
                        round
                        className="px-12 py-5 text-2xl font-normal text-white uppercase hover:-translate-y-1 hover:shadow-2xl"
                        disabled={isUpdatingMe}
                    >
                        Save settings
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUserDataForm
