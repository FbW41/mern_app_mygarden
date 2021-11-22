import { Row, Col, Nav, Navbar, FormControl, Form, Button } from "react-bootstrap";
function Nav_top() {
    return(
        <Row>
            <Col>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">MyGarden</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/signupform">+Sign Up</Nav.Link>
                <Nav.Link href="/signinform">Sign In with JWT</Nav.Link>
                <Nav.Link href="/add_new">+Add New</Nav.Link>
                <Nav.Link href="/all_plant">All Plants</Nav.Link>
                <Nav.Link href="/signinformPassport">Signin with Passport</Nav.Link>
                <Nav.Link href="/contactus">Contact Us</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
            </Col>
        </Row>
    )
}

export default Nav_top;