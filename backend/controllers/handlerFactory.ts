import catchAsync from "../utils/catchAsync.js"
import APIFeatures from "../utils/apiFeatures.js"
import AppError from "../utils/appError.js"
import { isValidUUID } from "../utils/helpers.js"

export const getAll = <T>(delegate: any) =>
    catchAsync(async (req, res, next) => {
        const features = new APIFeatures(req.query).filter().sort().limitFields().paginate()

        const docs = (await delegate.findMany(features.query)) as T[]

        res.status(200).json({ status: "success", results: docs.length, data: docs })
    })

export const getOne = <T>(delegate: any) =>
    catchAsync(async (req, res, next) => {
        const { id } = req.params as { id: string }

        if (!isValidUUID(id)) {
            return next(new AppError(`ID: ${id} has invalid format. Must be a UUID.`, 400))
        }

        const doc = (await delegate.findUnique({
            where: { id },
        })) as T

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

        if (!isValidUUID(id)) {
            return next(new AppError(`ID: ${id} has invalid format. Must be a UUID.`, 400))
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

        if (!isValidUUID(id)) {
            return next(new AppError(`ID: ${id} has invalid format. Must be a UUID.`, 400))
        }

        const doc = (await delegate.delete({
            where: { id },
        })) as T

        if (!doc) {
            return next(new AppError(`No document found with ID ${id}`, 404))
        }

        res.status(204).json({ status: "success", data: null })
    })
