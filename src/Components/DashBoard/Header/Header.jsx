import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../../Redux/Actions/userData';
import './header.css'
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const userLogOut = () => {
        dispatch(logout())
        navigate("/")
    }
    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" >AMS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false">{userInfo.user.firstName}</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/" onClick={userLogOut}>Logout</NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header