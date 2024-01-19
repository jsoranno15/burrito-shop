import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"


export function Navbar(){
    const { openCart, cartQuantity } = useShoppingCart()
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
               {cartQuantity > 0 &&  <Button 
                onClick = {openCart}
                style={{position: "relative"}}>
                    Cart
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                        color:"white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        transform: "translate(55% , 45%)"
                    }}
                    >
                        {cartQuantity}
                    </div>
                </Button>}
            </Container>
        </NavbarBS>
    )
}