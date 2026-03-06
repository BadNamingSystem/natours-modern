import { Request } from "express"

type PrismaSortOrder = "asc" | "desc"

export default class APIFeatures {
    // Prisma findMany() arguments
    public query: {
        where?: Record<string, unknown>
        orderBy?: Record<string, PrismaSortOrder>[] | Record<string, PrismaSortOrder>
        select?: Record<string, boolean>
        include?: Record<string, unknown>
        skip?: number
        take?: number
    } = {}

    constructor(private queryString: Request["query"]) {}

    filter(): this {
        // 1) Hard filtering (exclude metadata)
        const queryObj = { ...this.queryString }
        const excluded = ["page", "sort", "limit", "fields"]
        excluded.forEach(el => delete queryObj[el])

        const where: Record<string, unknown> = {}

        // 2) Advanced filtering and type conversion
        Object.entries(queryObj).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                // Handle nested operators like { gte: '5' } -> { gte: 5 }
                const operatorEntries = Object.entries(value as Record<string, string>).map(([op, val]) => [
                    op,
                    isNaN(Number(val)) ? val : Number(val),
                ])
                where[key] = Object.fromEntries(operatorEntries)
            } else if (typeof value === "string") {
                // Handle flat values like { difficulty: 'easy' }
                where[key] = isNaN(Number(value)) ? value : Number(value)
            }
        })

        this.query.where = where
        return this
    }

    sort(): this {
        if (typeof this.queryString.sort === "string") {
            const sortBy = this.queryString.sort.split(",").map(field => {
                const desc = field.startsWith("-")
                const actualField = desc ? field.substring(1) : field
                return { [actualField]: (desc ? "desc" : "asc") as PrismaSortOrder }
            })
            this.query.orderBy = sortBy
        } else {
            this.query.orderBy = { createdAt: "desc" }
        }
        return this
    }

    limitFields(): this {
        if (typeof this.queryString.fields === "string") {
            const fields: Record<string, boolean> = {}
            this.queryString.fields.split(",").forEach(el => (fields[el.trim()] = true))
            this.query.select = fields
        }
        return this
    }

    paginate(): this {
        const page = Number(this.queryString.page) || 1
        const limit = Number(this.queryString.limit) || 100
        this.query.skip = (page - 1) * limit
        this.query.take = limit
        return this
    }
}
