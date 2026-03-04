import fs from "node:fs"
import crypto from "node:crypto"
import prisma from "../utils/db.js"

const tours = JSON.parse(fs.readFileSync(new URL("./tours.json", import.meta.url), "utf-8"))

const importData = async () => {
    try {
        console.log("Starting import...")

        const formattedTours = tours.map((tour: any) => ({
            ...tour,
            id: crypto.randomUUID(),
        }))

        const count = await prisma.tour.createMany({
            data: formattedTours,
            skipDuplicates: true,
        })
        console.log(`${count.count} tours successfully loaded`)
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error importing data:", err.message)
        } else {
            console.error("Error importing data:", err)
        }
    } finally {
        process.exit()
    }
}

const deleteData = async () => {
    try {
        console.log("Deleting data...")
        await prisma.tour.deleteMany()
        console.log("Data successfully deleted")
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error deleting data:", err.message)
        } else {
            console.error("Error deleting data:", err)
        }
    } finally {
        process.exit()
    }
}

if (process.argv[2] === "--import") {
    importData()
} else if (process.argv[2] === "--delete") {
    deleteData()
} else {
    console.log("Provide argument: --import or --delete")
    process.exit()
}
