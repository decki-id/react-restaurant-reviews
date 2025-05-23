import app from "./server.js"
import dotenv from "dotenv"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI, { maxPoolSize: 50, wtimeoutMS: 2500, useNewUrlParser: true }
).then(async client => {
  await RestaurantsDAO.injectDB(client)
  await ReviewsDAO.injectDB(client)
  app.listen(port, () => { console.log(`Server listening on port ${port}!`) })
}).catch(err => {
  console.error(err.stack)
  process.exit(1)
})