import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../api/burrito.json"
import { Button, Stack } from "react-bootstrap"

type CartItemProps = {
    id:number
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const item = storeItems.find(i=> i.id === id)
    if (item == null) return null

    return (
        <Stack direction ="horizontal" gap={2} className="cart d-flex align-items-center">
            <img src = {item.imgUrl} 
            style={{width: "75px", height: "75px" , objectFit:"cover"}}/>
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                    <span className="text-muted" style={{fontSize: ".85rem"}}>
                        x{quantity}</span> )}
                </div>
                <div className="text-muted" style={{fontSize: ".75rem"}}>
                    {item.price}
                </div>
            </div>
            <div>
                {item.price * quantity}
            </div>
            <Button variant="outline-danger" size="sm" onClick={()=>
            removeFromCart (item.id)} >&times;</Button>
        </Stack>
    )
}