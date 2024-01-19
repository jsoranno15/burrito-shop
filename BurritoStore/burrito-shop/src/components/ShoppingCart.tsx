import { Button, Offcanvas, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import storeItems from "../api/burrito.json"


type ShoppingCartProps ={
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const {closeCart, confirmOrder, cartQuantity, cartItems} = useShoppingCart()

    const totalCart = cartItems.reduce((total, cartItem) =>{
        const item = storeItems.find(i => i.id === cartItem.id)
        return total + (item?.price || 0) * cartItem.quantity},0)
        

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <OffcanvasHeader closeButton>
                <OffcanvasTitle className="cart-heading">Cart</OffcanvasTitle>
            </OffcanvasHeader>
            <Offcanvas.Body>
                <Stack gap ={3}>
                    {cartItems.map(item=>(
                    <CartItem key={item.id} {...item}/>
                    ))}
                    <div className="cart ms-auto fw-bold fs-5">
                        Total {" "}{totalCart}
                    </div>
                    
                     {cartQuantity > 0 && 
                    <Button className="button" font-family="Comfortaa" onClick={confirmOrder} >
                        Confirm
                    </Button>}
                    
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}