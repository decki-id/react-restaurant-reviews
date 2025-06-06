import React from "react"
import Login from "./components/login"
import AddReview from "./components/add-review"
import Restaurants from "./components/restaurants"
import RestaurantsList from "./components/restaurants-list"
import { Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [user, setUser] = React.useState(null)
  async function login(user = null) { setUser(user) }
  async function logout() { setUser(null) }

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link to={"/restaurants"} className="navbar-brand">Restaurant Reviews</Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item"><Link to={"/restaurants"} className="nav-link">Restaurants</Link></li>
            <li className="nav-item">
                {user ? (
                  <button onClick={logout} className="nav-link bg-dark border-0" style={{ cursor: "pointer" }}>
                    Logout {user.name}
                  </button>
                ) : (
                  <Link to={"/login"} className="nav-link">Login</Link>
                )}
            </li>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurants/:id" element={<Restaurants user={user} />} />
          <Route path="/restaurants/:id/review" element={<AddReview user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </>
  )
}

export default App