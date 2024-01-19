import { Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"


export function Navbar(){
    return(
        <NavbarBS sticky="top" className = "nav">
            <Container>
                <Nav className = "me-auto" > 
                    <Nav.Link to="/" as={NavLink} >
                        Customer
                    </Nav.Link>
                    <Nav.Link to="/employee" as={NavLink} >
                        Employee
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBS>
    )
}