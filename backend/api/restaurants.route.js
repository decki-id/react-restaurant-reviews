import express from "express"

const router = express.Router()

router.route("/").get((req, res) => res.send("What's up, motherfuckers!"))

export default router