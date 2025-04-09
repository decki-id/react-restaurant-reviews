import cors from "cors"
import express from "express"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "Connection error, goddammit!" }))

export default app