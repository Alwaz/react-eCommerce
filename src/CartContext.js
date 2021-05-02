// Reducer will have a dispatch function that takes an object {type}
import React,{createContext,useReducer} from 'react'
import {CartReducer} from './CartReducer'

export const CartContext=createContext();

const CartContextProvider = (props) => {
      const [cart, dispatch] = useReducer(CartReducer, {shoppingCart: [], totalPrice: 0, qty: 0})
    
    return (
         <div>
            <CartContext.Provider value={{...cart, dispatch}}>
                 {/* provide data to childeren components  */}
                 {props.children}
             </CartContext.Provider>
            
         </div>
    )
 }

 export default CartContextProvider
