import stripe, { Stripe } from "stripe"
import prisma from "../utils/db.js"
import { Booking } from "@prisma/client"
import { createOne, getOne, getAll, updateOne, deleteOne } from "./handlerFactory.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { isValidId } from "../utils/helpers.js"

export const getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1. Get the currently booked tour
    const tour = await prisma.tour.findUnique({
        where: { id: req.params.tourId as string },
    })

    if (!tour) return next(new AppError("No tour found with that ID", 404))

    // 2. Create the checkout session
    const host = req.get("host")
    const stripeObj = new stripe(process.env.STRIPE_SECRET_TEST!)

    const session = await stripeObj.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: tour.price * 100,
                    product_data: {
                        name: `${tour.name} Tour`,
                        description: tour.summary,
                        images: [`${req.protocol}://${host}/img/tours/${tour.imageCover}`],
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        // FOR PRODUCTION: Redirect to frontend without sensitive query params
        success_url: `${process.env.ALLOWED_ORIGIN || "http://localhost:5173"}/me/bookings?alert=booking`,
        cancel_url: `${process.env.ALLOWED_ORIGIN || "http://localhost:5173"}/tours/${tour.slug || ""}`,
        customer_email: req.user!.email,
        client_reference_id: req.params.tourId as string,
    })

    // 3. Send session to client
    res.status(200).json({
        status: "success",
        session,
    })
})

const createBookingWebhook = async (session: Stripe.Checkout.Session) => {
    const tourId = session.client_reference_id
    const user = await prisma.user.findUnique({
        where: { email: session.customer_email || "" },
    })
    const price = (session.amount_total || 0) / 100

    if (!tourId || !user) return

    await prisma.booking.create({
        data: {
            tourId,
            userId: user.id,
            price,
        },
    })
}

export const webhookCheckout = catchAsync(async (req, res, next) => {
    const signature = req.headers["stripe-signature"]
    const stripeObj = new stripe(process.env.STRIPE_SECRET_TEST!)

    let event: Stripe.Event
    try {
        event = stripeObj.webhooks.constructEvent(req.body, signature as string, process.env.STRIPE_WEBHOOK_TEST!)
    } catch (err: unknown) {
        const error = err as Error
        return next(new AppError(`Webhook error: ${error.message}`, 400))
    }

    if (event.type === "checkout.session.completed") {
        await createBookingWebhook(event.data.object as Stripe.Checkout.Session)
    }

    res.status(200).json({ received: true })
})

export const getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await prisma.booking.findMany({
        where: { userId: req.user!.id },
        include: {
            tour: {
                include: {
                    _count: {
                        select: {
                            likes: true,
                        },
                    },
                },
            },
        },
    })

    const bookingsWithLikeCount = bookings.map(booking => {
        const likesCount = booking.tour._count.likes
        const { _count: _, ...tour } = booking.tour

        return {
            ...booking,
            tour: {
                ...tour,
                likesCount,
            },
        }
    })

    res.status(200).json({
        status: "success",
        results: bookingsWithLikeCount.length,
        data: bookingsWithLikeCount,
    })
})

export const checkBookingOwnership = catchAsync(async (req, res, next) => {
    const { id } = req.params as { id: string }

    if (!isValidId(id)) {
        return next(new AppError(`ID: ${id} has invalid format.`, 400))
    }

    const booking = await prisma.booking.findUnique({
        where: { id },
        select: { userId: true },
    })

    if (!booking) {
        return next(new AppError(`No booking found with ID ${id}`, 404))
    }

    if (req.user!.role !== "admin" && booking.userId !== req.user!.id) {
        return next(new AppError("You do not have permission to perform this action", 403))
    }

    next()
})

const bookingPopOptions = {
    user: { select: { name: true, email: true } },
    tour: { select: { name: true } },
}

export const createBooking = createOne<Booking>(prisma.booking)
export const getBooking = getOne<Booking>(prisma.booking, bookingPopOptions)
export const getAllBookings = getAll<Booking>(prisma.booking, bookingPopOptions)
export const updateBooking = updateOne<Booking>(prisma.booking)
export const deleteBooking = deleteOne<Booking>(prisma.booking)
