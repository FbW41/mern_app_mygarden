import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function Add_new() {
    const [name, setName]= useState('');
    const [picture, setPicture] = useState();
    const [successMsg, setSuccessMsg] = useState();
    // update plant name
    const getName = (event)=>{
        setName(event.target.value)
    }
    // this function will update picture data
    const selectPic = (event)=>{
        setPicture(event.target.files[0]);
    }
    // add plant data to backend
    const add = (event)=>{
        event.preventDefault();
        console.log(picture)
        // collect all data from form
        const formData = new FormData(); // create instance of a object for html form
        formData.append('name', name); // add plant name to formData object
        formData.append('plantPic',picture);// add plant picture to formData object
        
        // configuaration for file type input
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        } 
        axios.post('/plant/add', formData, config)
        .then(response=> {
            const successMsg = response.data
            setSuccessMsg(response.data)
        })
    }

    return(
        <Row>
            <Col>
              <h1>Add New Plant/tree/Herb</h1>
                {
                 successMsg != null &&
                    <Alert variant="success">
                       {successMsg}
                    </Alert>
                }
                <Form onSubmit={add}>
                <Form.Group controlId="plantName">
                    <Form.Label>Plant Name</Form.Label>
                    <Form.Control type="text" placeholder="What is your plant/trees name?" onChange={getName} name="name"/>
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Upload a Picture" onChange={selectPic} name="plantPic"/>
                </Form.Group>
                <Button variant="danger" type="submit">
                    Add to Garden
                </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Add_new;