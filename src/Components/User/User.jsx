import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from '../DashBoard/Header/Header'
import SideBar from '../DashBoard/Sidebar/SideBar'
import Loading from '../Loading'

const User = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
        },
    };
    const fetchUsers = async () => {
        setLoading(true)
        const { data } = await axios.get("https://acms-api.herokuapp.com/api/user/get", config)
        setUsers(data.users)
        console.log(data.users);
        setLoading(false)

    }
    const deleteHandler = async (userID) => {
        window.confirm("Are you sure?")
        await axios.delete(`https://acms-api.herokuapp.com/api/user/delete/${userID}`, config)
        window.location.reload(false);
    }

    useEffect(() => {
        fetchUsers()
        if (!userInfo) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [navigate])

    if (userInfo.user.role === "MANAGER" || userInfo.user.permissions?.includes("user:all")) {
        return (
            <>
                <Header />
                <div className='d-flex'>
                    <SideBar />
                    <div className="right_section">
                        <div className="user_card">

                            {
                                (userInfo.user.permissions?.includes("user:add") || (userInfo?.user.role === "MANAGER")) &&
                                <Button className='submit_login mb-2' onClick={() => { navigate("/user/add") }}>Add a user</Button>
                            }


                            {loading && <Loading />}

                            {
                                users?.map((elm) => {
                                    return (
                                        <Accordion className='mb-2' key={elm._id}>
                                            <Card >
                                                <Card.Header style={{ display: "flex" }}>
                                                    <span style={{ color: "black", textDecoration: "none", flex: 1, cursor: "pointer", alignSelf: "center", fontSize: 18, }}>
                                                        <Accordion.Toggle as={Card.Text} variant="link" eventKey="0" >{elm.firstName} {elm.lastName}</Accordion.Toggle>
                                                    </span>
                                                    <div >
                                                        {
                                                            (userInfo.user.permissions?.includes("user:view") || userInfo.user.permissions?.includes("user:update") || (userInfo?.user.role === "MANAGER")) &&
                                                            <NavLink
                                                                to={`/user/add/${elm._id}`}
                                                            ><Button className='submit_login'>View</Button> </NavLink>
                                                        }

                                                        {
                                                            (userInfo.user.permissions?.includes("user:delete") || (userInfo?.user.role === "MANAGER")) &&
                                                            <Button variant="danger" className="mx-2"
                                                                onClick={() => deleteHandler(elm._id)}
                                                            > Delete</Button>
                                                        }
                                                    </div>
                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between user_details">
                                                            <h6>Email : {elm.email}</h6>
                                                            <h6>First Name : {elm.firstName}</h6>
                                                            <h6>First Name : {elm.lastName}</h6>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </>
        )
    }
    else {
        navigate("/dashboard")
    }

}

export default User