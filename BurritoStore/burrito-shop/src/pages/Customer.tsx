import burritos from "../api/burrito.json"
import { Col, Row } from "react-bootstrap"
import { ShopItem } from "../components/ShopItem"

export function Customer(){
    return (
    <>
        <h1 className="heading">Burritos</h1>
        < Row md={2} xs={1} lg = {3} className = "g-3">
            {burritos.map(burrito => 
                <Col key={burrito.id}>
                    <ShopItem {...burrito} />
                </Col>
            )}
            
        </Row>
    </>
    )
}