import React, { useEffect } from 'react'
import Header from '../DashBoard/Header/Header'
import { Accordion, Card, Container } from 'react-bootstrap'
import SideBar from '../DashBoard/Sidebar/SideBar'
import { useDispatch, useSelector } from "react-redux";
import { userDataFunc } from '../../Redux/Actions/userData'
import Loading from '../Loading'
import { useNavigate } from 'react-router-dom';
const Data = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.userData);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
        dispatch(userDataFunc())
        // eslint-disable-next-line
    }, [navigate])

    if (userInfo) {

        return (
            <>
                <Header />
                <div className='d-flex'>
                    <SideBar />
                    <div className="right_section">
                        {data.loading && <Loading />}
                        <div className="user_card">
                            <Container>

                                {data.usersInfo?.map((elm) => {
                                    return (
                                        <Accordion className='mb-2' key={elm._id} >
                                            <Card >
                                                <Card.Header style={{ display: "flex" }}>
                                                    <span style={{ color: "black", textDecoration: "none", flex: 1, cursor: "pointer", alignSelf: "center", fontSize: 18, }}>
                                                        <Accordion.Toggle as={Card.Text} variant="link" eventKey="0" >{elm.firstName}</Accordion.Toggle>
                                                    </span>

                                                </Card.Header>

                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="d-flex justify-content-between user_details">
                                                            <h6>Email : {elm.email}</h6>
                                                            <h6>Number : {elm.phone}</h6>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>

                                    )
                                })}
                            </Container>
                        </div>

                    </div>
                </div>

            </>
        )
    }
    else {
        navigate("/")
    }
}

export default Data