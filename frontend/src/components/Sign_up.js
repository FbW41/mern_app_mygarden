import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Sign_up() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })
    // get form value inside user state
    const getValue = (e)=>{
        setUser({
            ...user, // all previous values
            [e.target.name]: e.target.value // new key:value
        })
    }
    // Send signup data to backend and redirect to frontend
    const createUser = (e)=>{
        e.preventDefault();
        console.log(user)
        axios.post('/user/create', user)
        .then(res=>{
            window.location.href = '/signinform'
        })
    }
    return(
        <Row>
            <Col>
                <Form onSubmit={createUser}>
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="username"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={getValue} name="email"/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={getValue} name="password"/>
                </Form.Group>
                <Button variant="success" type="submit">
                    Sign Up
                </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Sign_up;