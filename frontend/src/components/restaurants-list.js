import React, { useState, useEffect } from "react"
import RestaurantDataService from "../services/restaurant"
import { Link } from "react-router-dom"

const RestaurantsList = props => {
    const
        [restaurants, setRestaurants] = useState([]),
        [searchName, setSearchName] = useState(""),
        [searchZip, setSearchZip] = useState(""),
        [searchCuisine, setSearchCuisine] = useState(""),
        [cuisines, setCuisines] = useState(["All Cuisines"])

    useEffect(() => {
        retrieveRestaurants()
        retrieveCuisines()
    }, [])

    const
        onChangeSearchName = e => {
            const searchName = e.target.value
            setSearchName(searchName)
        },
        onChangeSearchZip = e => {
            const searchZip = e.target.value
            setSearchZip(searchZip)
        },
        onChangeSearchCuisine = e => {
            const searchCuisine = e.target.value
            setSearchCuisine(searchCuisine)
        },
        retrieveRestaurants = () => {
            RestaurantDataService.getAll().then(response => {
                console.log(response.data)
                setRestaurants(response.data.restaurants)
            }).catch(e => { console.log(e) })
        },
        retrieveCuisines = () => {
            RestaurantDataService.getCuisines().then(response => {
                console.log(response.data)
                setCuisines(["All Cuisines"].concat(response.data))
            }).catch(e => { console.log(e) })
        },
        refreshList = () => { retrieveRestaurants() },
        find = (query, by) => {
            RestaurantDataService.find(query, by).then(response => {
                console.log(response.data)
                setRestaurants(response.data.restaurants)
            }).catch(e => { console.log(e) })
        },
        findByName = () => { find(searchName, "name") },
        findByZip = () => { find(searchZip, "zipcode") },
        findByCuisine = () => {
            if (searchCuisine === "All Cuisines") {
                refreshList()
            } else {
                find(searchCuisine, "cuisine")
            }
        }

    return (
        <div>
            <div className="row">
                <div className="col-lg-4 mb-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search by name" value={searchName} onChange={onChangeSearchName} autoFocus={true} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={findByName}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search by zipcode" value={searchZip} onChange={onChangeSearchZip} />
                        <div className="input-group_append">
                            <button className="btn btn-outline-secondary" type="button" onClick={findByZip}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-2">
                    <div className="input-group">
                        <select onChange={onChangeSearchCuisine}>
                            {cuisines.map(cuisine => {
                                return (<option key={cuisine} value={cuisine}>{cuisine.substr(0, 20)}</option>)
                            })}
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={findByCuisine}>Search</button>
                        </div>
                    </div>
                </div>
            </div >
            <div className="row">
                {restaurants.map((restaurant) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`

                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine:</strong> {restaurant.cuisine}
                                        <br />
                                        <strong>Address:</strong> {address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">View Review</Link>
                                        <a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default RestaurantsList