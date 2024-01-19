import { Card } from "react-bootstrap"
import { PopUp } from "./PopUp"


type StoreShopProps = {
    id: number,
    name: string,
    price: number
    imgUrl: string
}


export function ShopItem({ id, name, price, imgUrl }: StoreShopProps) {
    
    return (
        <Card>
            <Card.Img 
            variant="top" 
            src={imgUrl} 
            height="200px" 
            style={{ objectFit: "cover" }}
            />
            <Card.Body className= "d-flex flex-column">
                <Card.Title className ="d-flex justify-content-between 
                align-items-baseline mb-4" >
                    <span className="fs-5">{name}</span>
                    <span className="fs-5 text-muted">{price}</span>
                </Card.Title>
                <div className="ms-auto">
                    <PopUp itemID={id} />
                </div>
            </Card.Body>
    </Card>
    )
}