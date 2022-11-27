import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../DashBoard/Header/Header'
import SideBar from '../DashBoard/Sidebar/SideBar'
import Loading from '../Loading'

const EditUser = () => {
    const [singleUserDetails, setsingleUserDetails] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    // For role and permissions
    const [staticOrDynamic, setStaticOrDynamic] = useState("")
    const [role, setRole] = useState("")
    const [permissions, setPermissions] = useState([])


    const navigate = useNavigate()
    const params = useParams()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
        },
    };
    const submitEditHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        await axios.patch(`https://acms-api.herokuapp.com/api/user/update/${params.id}`, { firstName, lastName, email, role, permissions }, config)
        setFirstName("");
        setLastName("");
        setEmail("");

        setLoading(true)
        navigate("/user");
        console.log(firstName, lastName, email, role, permissions);
    };


    const fetching = async () => {
        setLoading(true)
        const { data } = await axios.get(`https://acms-api.herokuapp.com/api/user/${params.id}`, config);
        setsingleUserDetails(data)
        console.log(data);
        console.log(singleUserDetails);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setEmail(data.data.email);
        setRole(data.data.role);
        setLoading(false)
    };

    const handlePermisisons = (e) => {
        let tempPermissions = [...permissions]
        console.log(e.target.value);

        if (e.target.defaultChecked) {
            tempPermissions.push(e.target.value)
        } else {
            tempPermissions = tempPermissions.filter(permission => permission !== e.target.value);
        }
        setPermissions(tempPermissions)

    }
    // const seeCheckdPermissioins = (e) => {
    //     console.log(e.target.value);
    //     return permissions.includes(e.target.value)
    // }


    useEffect(() => {
        fetching();

        // eslint-disable-next-line
    }, [params.id]);

    return (
        <>
            <Header />
            <div className='d-flex'>
                <SideBar />
                <div className="right_section">
                    {loading && <Loading />}
                    <Container className='mt-2' style={{ height: "90vh" }}>

                        <Card className="mt-2">
                            <Card.Header>Update or view the user</Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitEditHandler}>

                                    <Form.Group >
                                        <Form.Label>Enter First Name</Form.Label>
                                        <Form.Control className='shadow-none' value={firstName} placeholder="Enter first name" required onChange={(e) => setFirstName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Enter Last Name</Form.Label>
                                        <Form.Control className='shadow-none' value={lastName} placeholder="Enter last name" required onChange={(e) => setLastName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Enter email</Form.Label>
                                        <Form.Control className='shadow-none' value={email} placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>


                                    <select className="form-select" required onChange={(e) => setStaticOrDynamic(e.target.value)} aria-label="Default select example"
                                        style={{
                                            color: "#000000bd",
                                            border: "1px solid #0000004d",
                                            width: "100%",
                                            fontSize: "18px",
                                            marginBottom: "13px",
                                        }}>
                                        <option >Choose Static/Dynamic</option>
                                        <option value="static">Static</option>
                                        <option value="dynamic">Dynamic</option>
                                    </select>
                                    {/* Conditional rendering */}
                                    {
                                        staticOrDynamic === "static" &&
                                        <select className="form-select" required onChange={(e) => setRole(e.target.value)} value={role}
                                            aria-label="Default select example"
                                            style={{
                                                color: "#000000bd",
                                                border: "1px solid #0000004d",
                                                marginBottom: "13px",
                                                fontSize: "18px",
                                            }}>
                                            <option >Give static permissions</option>
                                            <option value="USER">User</option>
                                            <option value="MANAGER">Manager</option>
                                        </select>

                                    }
                                    {
                                        staticOrDynamic === "dynamic" &&
                                        <Form.Group >
                                            <Form.Label className='mt-1'>Select permissions</Form.Label>
                                            <div key='inline-checkbox' className="mb-3 mt-1">
                                                <Form.Check inline value="user:view" onChange={handlePermisisons} label="user:view" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("user:view")} />

                                                <Form.Check inline value="user:add" onChange={handlePermisisons} label="user:add" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("user:add")} />

                                                <Form.Check inline value="user:update" onChange={handlePermisisons} label="user:update" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("user:update")}
                                                />

                                                <Form.Check inline value="user:delete" onChange={handlePermisisons} label="user:delete" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("user:delete")}
                                                />

                                                <Form.Check inline value="user:all" onChange={handlePermisisons} label="user:all" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("user:all")}
                                                />

                                                <hr />
                                                <Form.Check inline value="lead:see" onChange={handlePermisisons} label="lead:see" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("lead:see")}
                                                />

                                                <Form.Check inline value="lead:all" onChange={handlePermisisons} label="lead:all" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("lead:all")}
                                                />

                                                <Form.Check inline value="lead:delete" onChange={handlePermisisons} label="lead:delete" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("lead:delete")}
                                                />

                                                <Form.Check inline value="lead:update" onChange={handlePermisisons} label="lead:update" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("lead:update")}
                                                />

                                                <Form.Check inline value="dashboard" onChange={handlePermisisons} label="dashboard" name="group1" type="checkbox"
                                                    defaultChecked={singleUserDetails.data.permissions?.includes("dashboard")}
                                                />


                                            </div>
                                        </Form.Group>
                                    }

                                    {
                                        ((userInfo.user.permissions?.includes("user:update")) || (userInfo.user.role === "MANAGER")) &&
                                        <Button type="submit" className="submit_login d-flex" variant="primary">
                                            Update User  <span className='ml-1'></span>
                                        </Button>
                                    }

                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default EditUser