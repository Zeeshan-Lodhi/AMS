import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import SideBar from './Sidebar/SideBar'

const MainDashBoard = () => {
    const navigate = useNavigate()


    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [navigate])

    if (userInfo) {

        return (
            <>
                <Header />
                <SideBar />
            </>
        )
    } else {
        navigate("/")

    }
}

export default MainDashBoard