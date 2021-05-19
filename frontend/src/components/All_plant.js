import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
function All_plant() {
    const [plants, setPlants] = useState([])
    useEffect(()=>{
        axios.get('/plant/all')
        .then(response=>{
            console.log(response.data)
            setPlants(response.data)
        })
    }, [])
    return(
        <Row>
            {
                plants.map((item, index)=>{
                    return(
                        <Col key={index}>
                        <h3>Plant Name: {item.name}</h3>
                        <img src={item.plantPic}/>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default All_plant;