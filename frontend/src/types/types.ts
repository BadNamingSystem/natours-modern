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
    reviews?: Review[]
}

export type Guide = {
    id: string
    name: string
    role: string
    photo: string
}

export type Review = {
    id: string
    review: string
    rating: number
}

export type TourLocation = {
    id: string
    day: number
    type: string
    coordinates: [number, number]
    description: string
}
