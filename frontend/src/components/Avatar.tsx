function Avatar({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="mr-4 h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
    )
}

export default Avatar
