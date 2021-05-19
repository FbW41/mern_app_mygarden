import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Add_new() {
    const [name, setName]= useState('');
    const getName = (event)=>{
        setName(event.target.value)
    }
    const add = ()=>{
        // todo: how to make below absolute path to relative path
        axios.post('http://localhost:5000/plant/add', {name})
        .then(response=> {
            const successMsg = response.data
            console.log(successMsg)
        })
    }
    return(
        <Row>
            <Col>
              <h1>Add New Plant/tree/Herb</h1>
                <Form.Group controlId="plantName">
                    <Form.Label>Plant Name</Form.Label>
                    <Form.Control type="text" placeholder="What is your plant/trees name?" onChange={getName}/>
                </Form.Group>
                <Button variant="danger" type="button" onClick={add}>
                    Add to Garden
                </Button>
            </Col>
        </Row>
    )
}

export default Add_new;