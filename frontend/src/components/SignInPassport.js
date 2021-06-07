import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SignInPassport() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const getValue = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const localLogin = (e)=> {
        e.preventDefault();
        axios.post('/signin/passport/local', user)
        .then(res=>{
            console.log('Data from backend Local', res.data)
            window.location.href = '/profile/'+res.data._id; // localhost:3000/profile/:id
        })
    }
    
    return(
        <Row>
            <Col>
                <Form onSubmit={localLogin}>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email"  name="email" onChange={getValue}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={getValue}/>
                </Form.Group>
                <Button variant="danger" type="submit">
                    Local Sign-in
                </Button>
                </Form>
                <a href="http://localhost:5000/signin/passport/github" className="btn btn-success">
                    Github login
                </a>
                <a href="http://localhost:5000/signin/passport/facebook" className="btn btn-danger">
                    FaceBook login
                </a>
            </Col>
        </Row>
    )
}

export default SignInPassport;


