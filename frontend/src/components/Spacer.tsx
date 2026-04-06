function Spacer({ padding }: { padding?: number }) {
    return <div className={`my-${padding || 22} h-px w-full bg-gray-200`}></div>
}

export default Spacer
