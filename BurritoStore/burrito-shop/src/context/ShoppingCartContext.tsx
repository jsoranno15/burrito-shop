import { useState } from "react";
import { createContext, useContext, ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { Order } from "../components/model";
import storeItems from "../api/burrito.json";
import fs from 'fs';
import { Console } from "console";



type ShoppingCartProviderProps = {
    children : ReactNode
}

type CartItem = {
    id: number
    name: string
    quantity: number
}

type ShoppingCartContext = {
    openCart: ()=>void
    closeCart: ()=>void
    clearCart: ()=>void
    getItemQuantity: (id:number) => number
    getItemOrders: () => Order[]
    increaseCartQuantity: (id:number) => void
    //decreaseCartQuantity: (id:number) => void
    removeFromCart: (id: number) => void
    getCartTotal: () => number
    confirmOrder: (e: React.FormEvent) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)


export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children} : ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [itemOrders, setOrders] = useState<Order[]>([])

    const totalCart= cartItems.reduce((total, cartItem) =>{
        const item = storeItems.find(i => i.id === 
        cartItem.id)
        return total + (item?.price || 0) * cartItem.quantity},0)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }


    function getCartTotal(){
        return totalCart
    }

    function increaseCartQuantity(id: number){
        setCartItems(currItems => {
            const itemName = storeItems.find(item => item.id === id)?.name || ""
            if(currItems.find(item => item.id === id) == null){
                
                return[...currItems, {id, name:itemName, quantity: 1}]
            } else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, name:itemName, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }
    // function decreaseCartQuantity(id: number){
    //     setCartItems(currItems => {
    //         if(currItems.find(item => item.id === id)?.quantity === 1){
    //             return[...currItems.filter(item => item.id !== id)]
    //         } else{
    //             return currItems.map(item => {
    //                 if(item.id === id){
    //                     return {...item, quantity: item.quantity - 1}
    //                 } else{
    //                     return item
    //                 }
    //             })
    //         }
    //     })
    // }
    function removeFromCart(id: number){
        setCartItems(currItems => {
            return[...currItems.filter(item => item.id !== id)]
            
        })

    }

    function clearCart(){
        setCartItems([])
    }

    function confirmOrder(e: React.FormEvent){
        e.preventDefault()
        const burritoNames: string[] = cartItems.map(item => `${item.name} (${item.quantity})`);
        setOrders([...itemOrders, {orderId:Date.now(), details:burritoNames, price:totalCart}])
        
        //storeOrder({id:Date.now(),  price:totalCart}, "./api/orders.json");
        clearCart()
        closeCart()
        console.log([...cartItems])
    }

    function getItemOrders(){
        return[...itemOrders]
    }


    return(
        <ShoppingCartContext.Provider 
        value ={{
            getItemQuantity, 
            //decreaseCartQuantity, 
            removeFromCart, 
            increaseCartQuantity,
            openCart, 
            closeCart,
            confirmOrder,
            getItemOrders,
            getCartTotal,
            clearCart,
            cartItems,
            cartQuantity}
        }>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
        
    )
}