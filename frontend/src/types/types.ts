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
    stops: number
    startDates: string[]
    startLocation: {
        type: string
        address: string
        coordinates: [number, number]
        description: string
    }
    locations: {
        id: string
        type: string
        coordinates: [number, number]
        description: string
    }[]
    guides?: {
        id: string
        name: string
        role: string
        photo: string
    }[]
    reviews?: {
        id: string
        review: string
        rating: number
    }
}
