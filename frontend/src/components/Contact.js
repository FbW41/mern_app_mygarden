import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [emailData, setEmailData] = useState({
    email: "",
    message: "",
    name: "",
  });
  const [successMsg, setSuccessMsg] = useState();
  useEffect(() => {
    setEmailData({
      email: "",
      message: "",
      name: "",
      image: "",
    });
  }, [successMsg]);

  // update plant name
  const getName = (event) => {
    setEmailData({ ...emailData, [event.target.name]: event.target.value });
  };
  // this function will update picture data

  // add plant data to backend
  const sendEmail = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("image", emailData.image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("/contact", emailData).then((res) => {
      console.log(res.data);
      setSuccessMsg(res.data);
    });
  };

  return (
    <Row>
      <Col>
        <h1>Contact Us</h1>
        {successMsg != null && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={sendEmail}>
          <Form.Group controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              onChange={getName}
              name="name"
              value={emailData.name}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={getName}
              name="email"
              value={emailData.email}
            />
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>message</Form.Label>
            <Form.Control
              type="text"
              onChange={getName}
              name="message"
              value={emailData.message}
            />
          </Form.Group>

          <Button variant="danger" type="submit">
            contact
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Contact;
