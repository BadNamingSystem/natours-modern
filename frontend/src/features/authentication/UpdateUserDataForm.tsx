import GradientLabel from "../../components/GradientLabel.tsx"
import Input from "../../components/Input.tsx"
import { useUser } from "./useUser.ts"
import Avatar from "../../components/Avatar.tsx"
import Button from "../../components/Button.tsx"
import { useUpdateMe } from "./useUpdateMe.ts"

function UpdateUserDataForm() {
    const { fullName, email, photo } = useUser()
    const { updateMe, isUpdatingMe } = useUpdateMe()

    function handleUpdateUserData(formData: FormData) {
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        if (!name || !email) return

        updateMe({ name, email })
    }

    return (
        <div className="mx-auto max-w-272 px-32">
            <GradientLabel>Your account settings</GradientLabel>
            <form action={handleUpdateUserData}>
                <Input type="text" defaultValue={fullName} id="name" name="name" label="Name" />
                <Input type="text" defaultValue={email} id="email" name="email" label="Email address" />
                <div className="mb-12 flex items-center gap-8 py-4">
                    <Avatar
                        src={`/users/${photo || "default.jpg"}`}
                        alt={`photo of ${fullName}`}
                        className="h-32 w-32 shrink-0"
                    />
                    <input type="file" accept="image/*" id="photo" name="photo" className="hidden" />
                    <label
                        htmlFor="photo"
                        className="cursor-pointer border-b border-emerald-500 px-3 py-2 text-[1.8rem] text-emerald-500 transition-colors duration-400 hover:bg-emerald-500 hover:text-white"
                    >
                        Choose new photo
                    </label>
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
