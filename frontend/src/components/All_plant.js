import { Row, Col, Image, Alert } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
function All_plant() {
  const [plants, setPlants] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState();
  //const [updateMsg, setUpdateMsg] = useState();
  useEffect(() => {
    axios.get("/plant/all").then((response) => {
      console.log(response.data);
      setPlants(response.data);
      // make in unmount or clear after get all data
      setDeleteMsg(null);
    });
  }, [deleteMsg]);

  const deletePlant = (id) => {
    axios.get("/plant/delete/" + id).then((response) => {
      setDeleteMsg(response.data);
    });
  };
  return (
    <Row>
      {deleteMsg != null && <Alert variant="danger">{deleteMsg}</Alert>}
      {plants.map((item, index) => {
        return (
          <Col key={item._id}>
            <h3>Plant Name: {item.name}</h3>
            <h3>Added by: {item.added_by.username}</h3>
            <Image src={item.plantPic} thumbnail />
            <button type="button" onClick={() => deletePlant(item._id)}>
              Delete
            </button>
          </Col>
        );
      })}
    </Row>
  );
}

export default All_plant;
