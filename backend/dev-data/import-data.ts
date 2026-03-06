import fs from "node:fs"
import prisma from "../utils/db.js"

const getJson = (file: string) => JSON.parse(fs.readFileSync(new URL(file, import.meta.url), "utf-8"))

const toursRaw = getJson("./tours.json")
const usersRaw = getJson("./users.json")
const reviewsRaw = getJson("./reviews.json")

const importData = async () => {
    try {
        console.log("Starting clean import of relational data...")

        // 1. Import Users (needed by Tours and Reviews)
        const formattedUsers = usersRaw.map((u: any) => {
            const { _id, ...rest } = u
            return { ...rest, id: _id }
        })
        await prisma.user.createMany({ data: formattedUsers, skipDuplicates: true })
        console.log("✅ Users loaded")

        // 2. Import Tours (Looping for guide connections)
        for (const t of toursRaw) {
            const { _id, guides, ...rest } = t
            await prisma.tour.create({
                data: {
                    ...rest,
                    id: _id,
                    slug: t.slug || t.name.toLowerCase().replace(/ /g, "-"),
                    guides: {
                        connect: (guides || []).map((id: string) => ({ id })),
                    },
                },
            })
        }
        console.log("✅ Tours loaded (with guides linked)")

        // 3. Import Reviews
        const formattedReviews = reviewsRaw.map((r: any) => {
            const { _id, user, tour, ...rest } = r
            return {
                ...rest,
                id: _id,
                userId: user,
                tourId: tour,
            }
        })
        await prisma.review.createMany({ data: formattedReviews })
        console.log("✅ Reviews loaded")

        console.log("Data successfully imported!")
    } catch (err) {
        console.error("Import error:", err)
    } finally {
        process.exit()
    }
}

const deleteData = async () => {
    try {
        console.log("Deleting data...")
        await prisma.review.deleteMany()
        await prisma.tour.deleteMany()
        await prisma.user.deleteMany()
        console.log("Database cleared successfully.")
    } catch (err) {
        console.error("Error deleting data:", err)
    } finally {
        process.exit()
    }
}

if (process.argv[2] === "--import") {
    importData()
} else if (process.argv[2] === "--delete") {
    deleteData()
} else {
    console.log("Usage: npx tsx --env-file=.env dev-data/import-data.ts --import | --delete")
    process.exit()
}

// npx tsx --env-file=.env dev-data/import-data.ts --delete
