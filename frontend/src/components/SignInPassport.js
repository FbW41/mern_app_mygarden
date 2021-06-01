import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

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
        })
    }

    // GitHub authentication 
    const githubLogin = ()=>{
        axios.get('/signin/passport/github')
        .then(res=>{
            console.log('Data from backend Github', res.data)
        })
    }

    // Facebook authentication 
    const facebookLogin = ()=>{
        axios.get('/signin/passport/facebook')
        .then(res=>{
            console.log('Data from backend Facebook', res.data)
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
                <Button variant="warning" type="submit" onClick={facebookLogin}>
                    FaceBook Login
                </Button>
                <Button variant="primary" type="submit" onClick={githubLogin}>
                    GitHub Login
                </Button>
            </Col>
        </Row>
    )
}

export default SignInPassport;


