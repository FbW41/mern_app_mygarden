import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function Contactus() {
    const [emailData, setEmailData] = useState({
        username: '',
        message: '',
        email: ''
    })
    // get form values
    const getValue = (event)=>{
        setEmailData({
            ...emailData,
            [event.target.name] : event.target.value
        })
    }
    
    // send email data to backend
    const sendEmail = (e)=>{
       e.preventDefault();
       //console.log(emailData)
       axios.post('/backend/sendEmail')
       .then(res=> console.log(res.data));
    }
    return(
        <Row>
            <Col>
                <Form onSubmit={sendEmail}>
                <Form.Group controlId="username">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="username"/>
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label> Your Message:</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="message"/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="email"/>
                </Form.Group>
                <Button variant="danger" type="submit">
                    Contact Us
                </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Contactus;