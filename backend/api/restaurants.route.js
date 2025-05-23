import express from "express"
import ReviewsCtrl from "./reviews.controller.js"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)
router.route("/review").post(ReviewsCtrl.apiPostReview).put(ReviewsCtrl.apiUpdateReview).delete(ReviewsCtrl.apiDeleteReview)

export default router