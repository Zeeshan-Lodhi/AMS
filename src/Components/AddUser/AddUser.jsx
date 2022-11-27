import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form, } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Header from '../DashBoard/Header/Header'
import SideBar from '../DashBoard/Sidebar/SideBar'
import Loading from '../Loading'
const AddUser = () => {
    // const userLogin = useSelector((state) => state.userLogin);
    // const { userInfo } = userLogin;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    // For role and permissions
    const [staticOrDynamic, setStaticOrDynamic] = useState("")
    const [role, setRole] = useState("")
    const [permissions, setPermissions] = useState([])


    // Put values of permissions into array
    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [permissions, navigate])


    const handlePermisisons = (e) => {

        let tempPermissions = [...permissions]

        console.log(e.target.checked, e.target.value)

        if (e.target.checked) {
            tempPermissions.push(e.target.value)
        } else {
            tempPermissions = tempPermissions.filter(permission => permission !== e.target.value);
        }

        setPermissions(tempPermissions)

    }


    const addUser = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        setLoading(true)
        await axios.post("https://acms-api.herokuapp.com/api/user/add", { email, password, lastName, firstName, role, permissions }, config);
        console.log(email, password, lastName, firstName, role, permissions);
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setRole("")
        setPermissions([])
        setLoading(false)
    }
    if (userInfo) {

        return (
            <>
                <Header />
                <div className='d-flex'>
                    <SideBar />
                    <div className="right_section">
                        <Container className='mt-2' style={{ height: "90vh" }}>

                            {/* Form for user values */}
                            <Card className="mt-2">
                                <Card.Header>Add a new user</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={addUser}>


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

                                        <Form.Group >
                                            <Form.Label>Enter password</Form.Label>
                                            <Form.Control type='password' className='shadow-none' value={password} placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
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
                                            <select className="form-select" required onChange={(e) => setRole(e.target.value)}
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
                                                    <Form.Check inline value="user:view" onChange={handlePermisisons} label="user:view" name="group1" type="checkbox" />

                                                    <Form.Check inline value="user:add" onChange={handlePermisisons} label="user:add" name="group1" type="checkbox" />

                                                    <Form.Check inline value="user:update" onChange={handlePermisisons} label="user:update" name="group1" type="checkbox" />

                                                    <Form.Check inline value="user:delete" onChange={handlePermisisons} label="user:delete" name="group1" type="checkbox" />

                                                    <Form.Check inline value="user:all" onChange={handlePermisisons} label="user:all" name="group1" type="checkbox" />

                                                    <hr />
                                                    <Form.Check inline value="lead:see" onChange={handlePermisisons} label="lead:see" name="group1" type="checkbox" />

                                                    <Form.Check inline value="lead:all" onChange={handlePermisisons} label="lead:all" name="group1" type="checkbox" />

                                                    <Form.Check inline value="lead:delete" onChange={handlePermisisons} label="lead:delete" name="group1" type="checkbox" />

                                                    <Form.Check inline value="lead:update" onChange={handlePermisisons} label="lead:update" name="group1" type="checkbox" />

                                                    <Form.Check inline value="dashboard" onChange={handlePermisisons} label="dashboard" name="group1" type="checkbox" />

                                                </div>
                                            </Form.Group>
                                        }


                                        <Button type="submit" disabled={loading} className="submit_login d-flex" variant="primary">
                                            Add User  <span className='ml-1'>{loading && <Loading />}</span>
                                        </Button>

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                </div>
            </>
        )
    }
    else {
        navigate("/")
    }
}

export default AddUser