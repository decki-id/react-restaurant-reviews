import React, { useState } from "react"
import RestaurantDataService from "./restaurants-service"
import { Link, useParams } from "react-router-dom"

const AddReview = props => {
  let initialReviewState = "", editing = false, params = useParams()

  if (params.location && params.location.currentReview) {
    editing = true
    initialReviewState = params.location.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)
  const handleInputChange = e => { setReview(e.target.value) }
  const saveReview = () => {
    let data = { text: review, name: props.user.name, user_id: props.user.id, restaurant_id: params.id }

    if (editing) {
      data.review_id = params.location.currentReview._id
      RestaurantDataService.updateReview(data).then(response => {
        setSubmitted(true)
        console.log(response.data)
      }).catch(e => { console.log(e) })
    } else {
      RestaurantDataService.createReview(data).then(response => {
        setSubmitted(true)
        console.log(response.data)
      }).catch(e => { console.log(e) })
    }
  }

  return (
    <>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/restaurants/" + params.id} className="btn btn-success mt-2">Back to Restaurant</Link>
            </div>
          ) : (
            <div>
              <div className="container col-md-6">
                <h1 className="text-center mb-2">{editing ? "Edit" : "Create"} Review</h1>
                <div className="form-group">
                  <input type="text" className="form-control" id="text" name="text" value={review}
                    onChange={handleInputChange} required autoFocus={true}
                  />
                </div>
                <div className="d-grid mt-2"><button onClick={saveReview} className="btn btn-success">Submit</button></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Please login.</div>
      )}
    </>
  )
}

export default AddReview
