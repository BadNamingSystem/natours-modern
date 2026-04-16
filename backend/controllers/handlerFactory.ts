import catchAsync from "../utils/catchAsync.js"
import APIFeatures from "../utils/apiFeatures.js"
import AppError from "../utils/appError.js"
import { isValidId } from "../utils/helpers.js"

export const getAll = <T>(delegate: any, popOptions?: any) =>
    catchAsync(async (req, res, next) => {
        // Empty filter object
        let filter = {}
        // If tourId is present in params, filter reviews by tourId
        if (req.params.tourId) filter = { tourId: req.params.tourId }

        const features = new APIFeatures(req.query).filter().sort().limitFields().paginate()

        // Merge the nested route filter manually
        features.query.where = { ...features.query.where, ...filter }

        if (popOptions) features.query.include = popOptions

        const docs = (await delegate.findMany(features.query)) as T[]

        res.status(200).json({ status: "success", results: docs.length, data: docs })
    })

export const getOne = <T>(delegate: any, popOptions?: any) =>
    catchAsync(async (req, res, next) => {
        const { id } = req.params as { id: string }

        if (!isValidId(id)) {
            return next(new AppError(`ID: ${id} has invalid format.`, 400))
        }

        const query: any = { where: { id } }
        if (popOptions) query.include = popOptions

        const doc = (await delegate.findUnique(query)) as T

        if (!doc) {
            return next(new AppError(`No document found with ID ${id}`, 404))
        }

        res.status(200).json({ status: "success", data: doc })
    })

export const createOne = <T>(delegate: any) =>
    catchAsync(async (req, res, next) => {
        const doc = (await delegate.create({
            data: req.body,
        })) as T

        res.status(201).json({ status: "success", data: doc })
    })

export const updateOne = <T>(delegate: any) =>
    catchAsync(async (req, res, next) => {
        const { id } = req.params as { id: string }

        if (!isValidId(id)) {
            return next(new AppError(`ID: ${id} has invalid format.`, 400))
        }

        const doc = (await delegate.update({
            where: { id },
            data: req.body,
        })) as T

        if (!doc) {
            return next(new AppError(`No document found with ID ${id}`, 404))
        }

        res.status(200).json({ status: "success", data: doc })
    })

export const deleteOne = <T>(delegate: any) =>
    catchAsync(async (req, res, next) => {
        const { id } = req.params as { id: string }

        if (!isValidId(id)) {
            return next(new AppError(`ID: ${id} has invalid format.`, 400))
        }

        const doc = (await delegate.delete({
            where: { id },
        })) as T

        if (!doc) {
            return next(new AppError(`No document found with ID ${id}`, 404))
        }

        res.status(204).json({ status: "success", data: null })
    })
