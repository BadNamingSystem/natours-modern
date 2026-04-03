function Avatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`mr-4 h-14 w-14 shrink-0 overflow-hidden rounded-full ${className}`}>
            <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
    )
}

export default Avatar
