import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const
                restaurantId = req.body.restaurant_id,
                review = req.body.text,
                userInfo = {
                    name: req.body.name,
                    _id: req.body.user_id
                },
                date = new Date(),
                ReviewResponse = await ReviewsDAO.addReview(restaurantId, userInfo, review, date)

            res.json({ status: "Success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const
                reviewId = req.body.review_id,
                text = req.body.text,
                date = new Date(),
                reviewResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, text, date)

            let { error } = reviewResponse

            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "Unable to update review - user may not be original poster."
                )
            }

            res.json({ status: "Success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const
                reviewId = req.query.id,
                userId = req.body.user_id,
                reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)

            res.json({ status: "Success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}