import React, { useState, useEffect } from "react"
import RestaurantDataService from "./restaurants-service"
import { Link, useParams } from "react-router-dom"

const Restaurant = props => {
  let params_id = useParams().id
  const initialRestaurantState = { id: null, name: "", address: {}, cuisine: "", reviews: [] }
  const [restaurant, setRestaurant] = useState(initialRestaurantState)
  const getRestaurant = id => {
    RestaurantDataService.get(id).then(response => {
      setRestaurant(response.data)
      console.log(response.data)
    }).catch(e => { console.log(e) })
  }
  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id).then(() => {
      setRestaurant((prevState) => {
        prevState.reviews.splice(index, 1)
        return ({ ...prevState })
      })
    }).catch(e => { console.log(e) })
  }

  useEffect(() => { getRestaurant(params_id) }, [params_id])

  return (
    <>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine:</strong> {restaurant.cuisine}
            <br />
            <strong>Address:</strong> {restaurant.address.building} {restaurant.address.street} {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + params_id + "/review"} className="btn btn-primary mb-2">Add Review</Link>
          <h4>Reviews</h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User:</strong> {review.name}
                          <br />
                          <strong>Date:</strong> {new Date(review.date).toLocaleString()}
                        </p>
                        {
                          props.user && props.user.id === review.user_id &&
                          <div className="row">
                            <button onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">
                              Delete
                            </button>
                            <Link to={{ pathname: `/restaurants/${params_id}/review`, state: { currentReview: review } }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1">Edit
                            </Link>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-sm-4"><p>No reviews yet.</p></div>
            )}
          </div>
        </div>
      ) : (
        <div><br /><p>No restaurant selected.</p></div>
      )}
    </>
  )
}

export default Restaurant