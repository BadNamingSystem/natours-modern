import UpdateUserDataForm from "./UpdateUserDataForm.tsx"
import UpdatePasswordForm from "./UpdatePasswordForm.tsx"
import Spacer from "../../components/Spacer.tsx"

function AccountSettings() {
    return (
        <div className="px-12">
            <UpdateUserDataForm />
            <Spacer padding={26} />
            <UpdatePasswordForm />
        </div>
    )
}

export default AccountSettings
