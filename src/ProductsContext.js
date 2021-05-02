
// create context is a hook method that'll help accessing global state in diff components
import React, {createContext, useState} from 'react'
import dslr from '../src/assests/dslr.jpg'
import headphones from '../src/assests/headphones.jpg'
import iphone from '../src/assests/iphone.jpg'
import perfume from '../src/assests/perfume.jpg'
import rings from '../src/assests/rings.jpg'
import shoes from '../src/assests/shoes.jpg'
import watch from '../src/assests/watch.jpg'
import makeup from '../src/assests/makeup.jpg'


// store createcontext in a var, var name same as file name

// this needs to be imported in child component
export const ProductsContext= createContext();

//    This state will be used by other components
const ProductsContextProvider = (props) => {
    
    const[products]=useState([
        {id: 1, name: 'DSLR', image: dslr,price: 5000 , status: 'hot'},
        {id: 2, name: 'HeadPhones',image: headphones, price: 3000, status: 'new'},
        {id: 3, name: 'iPhone', image: iphone, price: 500, status: 'new'},
        {id: 4, name: 'Perfume', image: perfume, price: 1500, status: 'new'},
        {id: 5, name: 'Rings', image: rings, price: 2000, status: 'new'},
        {id: 6, name: 'Shoes', image: shoes, price: 4000, status: 'new'},
        {id: 7, name: 'Watch', image: watch, price: 4500, status: 'new'},
        {id: 8, name: 'Makeup', image: makeup, price: 5000, status: 'new'}
    ])




    return (
        <div>
            {/* Provider will provide data in child components */}
            <ProductsContext.Provider value={{products: [...products]}}>
              {props.children}
            </ProductsContext.Provider>
            
        </div>
    )
}

export default ProductsContextProvider
