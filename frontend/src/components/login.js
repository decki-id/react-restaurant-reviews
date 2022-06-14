import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = props => {
    let navigate = useNavigate()

    const
        initialUserState = {
            name: "",
            id: ""
        },
        [user, setUser] = useState(initialUserState),
        handleInputChange = e => {
            const { name, value } = e.target
            setUser({ ...user, [name]: value })
        },
        login = () => {
            props.login(user)
            navigate("/restaurants")
        }

    return (
        <div className="submit-form">
            <div className="container col-md-6">
                <h1 className="text-center mb-2">Login</h1>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInputChange} required autoFocus={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Password</label>
                    <input type="text" className="form-control" id="id" name="id" value={user.id} onChange={handleInputChange} required />
                </div>
                <div className="d-grid mt-2"><button type="button" className="btn btn-success" onClick={login}>Login</button></div>
            </div>
        </div>
    )
}

export default Login