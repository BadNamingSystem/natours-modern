import type { ComponentPropsWithoutRef } from "react"

type InputProps = {
    label?: string
    error?: string
} & ComponentPropsWithoutRef<"input">

const Input = ({ label, id, ...props }: InputProps) => {
    return (
        <div className="mb-10">
            {label && (
                <label className="mb-3 block text-2xl font-bold" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className="block w-full rounded-sm border-b-3 border-transparent bg-gray-100 px-7 py-5 text-2xl transition-all duration-300 outline-none focus:invalid:border-b-red-500 focus:valid:border-b-green-500"
                id={id}
                {...props}
            />
        </div>
    )
}

export default Input
