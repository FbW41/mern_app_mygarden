import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

function Contactus() {
    const [emailData, setEmailData] = useState({
        username: '',
        message: '',
        email: ''
    });
    const [msg, setMsg] = useState();

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
       axios.post('/backend/sendEmail', emailData)
       .then(res=> {
           const successMSg = res.data;
           setMsg(successMSg);
           setEmailData({
            username: '',
            message: '',
            email: ''
        })
       });
    }
    return(
        <Row>
            <Col>
                <Form onSubmit={sendEmail}>
                {
                    msg&&
                    <div className="alert alert-success">
                        <h1>{msg}</h1>
                    </div>
                }
                <Form.Group controlId="username">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="username" value={emailData.username}/>
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label> Your Message:</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="message" value={emailData.message}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control type="text" onChange={getValue} name="email" value={emailData.email}/>
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