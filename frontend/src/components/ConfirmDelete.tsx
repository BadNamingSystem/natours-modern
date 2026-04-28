import Button from "./Button.tsx"

type Props = {
    resourceName: string
    onConfirm?: () => void
    disabled?: boolean
    onCloseModal?: () => void
}

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }: Props) {
    return (
        <div className="flex w-100 flex-col gap-3">
            <h2 className="text-2xl font-semibold text-stone-700">Delete {resourceName}?</h2>

            <p className="mb-3 text-lg text-stone-600">
                Are you sure you want to permanently delete this {resourceName}? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-5">
                <Button disabled={disabled} onClick={onCloseModal}>
                    Cancel
                </Button>
                <Button
                    color="red"
                    disabled={disabled}
                    onClick={() => {
                        onConfirm?.()
                        onCloseModal?.()
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ConfirmDelete
