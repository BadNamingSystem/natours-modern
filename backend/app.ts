import express from "express"

const app = express()

app.set("query parser", "extended")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
