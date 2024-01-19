import { Card } from "react-bootstrap"
import storeItems from "../api/burrito.json"

type OrderProps = {
    orderId: number,
    price: number
    details: string[]
}

export function OrderList({ orderId, price, details }: OrderProps) {
    return (
        <Card style = {{width: "40rem"}}>
            <Card.Body className= "d-flex flex-column">
                <Card.Title className ="d-flex justify-content-between 
                align-items-baseline mb-4" >
                    <span className="fs-5">Order ID {orderId}</span>
                    <span className="fs-5 text-muted">Price ${price}</span>
                </Card.Title>
                <Card.Subtitle>
                    Details: {details.join(", ")} 
                </Card.Subtitle>
            </Card.Body>
    </Card>
    )
}