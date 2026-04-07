export type Tour = {
    id: string
    name: string
    slug: string
    createdAt: string
    summary: string
    description: string | null
    difficulty: string
    duration: number
    imageCover: string
    images: string[]
    maxGroupSize: number
    ratingsAverage: number
    ratingsQuantity: number
    price: number
    priceDiscount: number | null
    secretTour: boolean
    startDates: string[]
    startLocation: {
        type: string
        address: string
        coordinates: [number, number]
        description: string
    }
    locations: TourLocation[]
    guides: Guide[]
    reviews: Review[]
}

export type Guide = {
    id: string
    name: string
    role: string
    photo: string
}

export type Role = "user" | "guide" | "lead-guide" | "admin"

export type User = {
    id: string
    name: string
    email: string
    photo: string
    password: string
    role: Role
    createdAt: string
    passwordChangedAt: string | null
    passwordResetToken: string | null
    passwordResetExpires: string | null
    active: boolean
    canModify: boolean
}

export type Review = {
    id: string
    userId: string
    tourId: string
    review: string
    rating: number
    user: {
        name: string
        photo: string
    }
    createdAt: string
}

export type TourLocation = {
    id: string
    day: number
    type: string
    coordinates: [number, number]
    description: string
}
