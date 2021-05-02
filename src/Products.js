// This is the child component of ProductContext

import React, {useContext} from 'react'

// from the parent component
import {ProductsContext} from './ProductsContext'
import Banner from './Banner'
import './products.css'
import './banner.css'
import {CartContext} from './CartContext'
import CartContextProvider from './CartContext'

const Products = () => {
    // Accessing data stored in productontext
   const {products} = useContext(ProductsContext);
   const {dispatch} = useContext(CartContext);
   

    return (
         <div className='container'>
             <Banner />
        <div className='products'>
            {
            
                products.map((product)=>{

                 return(
                    <div className='product'  key={product.id}>
                    <div className='product-img'><img src={product.image} alt='not Found'/></div>
                    <div className='products-details'>
                        <div className='product-name'>{product.name}</div>
                        <div className='product-price'>${product.price}</div>

                        <div className='add-to-cart' onClick={()=>dispatch({
                            type:'ADD_TO_CART', id: product.id, product}
                            )} >Add to Cart
                        </div>
                        {product.status === 'hot' ? <div className='hot'>Hot</div>: ''}
                        {product.status === 'new' ? <div className='new'>New</div>: ''}

                    </div>  {/*end of product details */}
                </div>   //end of product container
                )})}  
        </div>  {/*end of products*/}
    </div> //end of  container
    )
}

export default Products
