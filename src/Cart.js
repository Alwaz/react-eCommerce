import React,{useContext} from 'react'
import {CartContext} from './CartContext'
import StripeCheckout from 'react-stripe-checkout'
import CartContextProvider from './CartContext'
import './cart.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Cart = (props) => {

    const {shoppingCart,totalPrice, qty, dispatch}=useContext(CartContext);
    
    const handleToken = async(token)=>{
        // console.log(token)
        const product= {name:'All Products' , price: totalPrice}
        const response = await axios.post('http://localhost:8080/checkout', {
            product, 
            token
     })

    console.log(response)
     const {status}=response.data;
     if(status==='success'){
         dispatch({type: 'EMPTY'})
         props.history.push('/');
         toast.success('You have paid successfully now you can continue shoping', 
         {position: toast.POSITION.TOP_RIGHT})
     }

    } 

    return (
        <div className='cart__container'>
            <div className='cart__details' style={{marginTop: '100px'}}>
                { shoppingCart.length > 0 ? 
                  shoppingCart.map(cart=>{
                    return(
                    <div className='cart' key={cart.id}>
                        <span className='cart_image'>
                            <img src={cart.image} alt='Not Found'/>
                        </span>

                        <span className='cart_product_name'>{cart.name}</span>
                        <span className='cart_product_price'>${cart.price}.00</span>

                       <div className='cart_qty'>
                        <span className='increment' onClick={()=>dispatch(
                            {type: 'INC', id: cart.id, cart})}
                            ><i class="fas fa-plus"></i></span>
                        <span className='cart_product_qty'>{cart.qty}</span>
                        <span className='decrement' onClick={()=>dispatch({
                            type: 'DEC', id: cart.id, cart})}>
                                <i class="fas fa-minus"></i>
                                </span>
                           
                        </div>  {/* end of cart qty */}

                        <div className='totalprice_remove'>

                        <div className='product_total_price'>${cart.price * cart.qty}.00</div>
                        <div className='remove' onClick={()=>dispatch({type: 'DEL', id: cart.id, cart})}><i class="fas fa-trash-alt"></i></div>
                            
                        </div>  {/* end of total price and remove */}
                        {/* <span className='product_total_price'>${cart.price * cart.qty}.00</span>
                        <span className='remove' onClick={()=>dispatch({type: 'DEL', id: cart.id, cart})}><i class="fas fa-trash-alt"></i></span> */}
                    </div> ) 
                })
                   
                : 'Your cart is currently empty'}
            </div>

             {shoppingCart.length > 0 ? 
                <div className='cart_summary'>
                  <div className='summary'>
                     <h3>Cart Summary</h3>
                     <div className='total_items'>
                         <div className='items'>Total Items</div> {/*end of items*/}
                         <div className='items_count'>{qty}</div> {/*end of items_count*/}
                    </div> {/*end of total_items*/}

                    <div className='total_price_section'>
                        <div className='just_title'>Total Price</div>
                        <div className='items_price'>${totalPrice}.00</div>
                    </div> {/*end of total price section*/}

                    <div className='strip_section'> 

                      <StripeCheckout 
                      stripeKey='pk_test_51ImMYuDL5ibPWLMNtdmImQssUoKu1uxn2dks5bfyp520E83aU88Cdeba3Qoao2L5R7fTegUwZJtyunFfHoxUxbj000qmjBLQrO' 
                      token={handleToken}
                      billingAddress
                      shippingAddress
                      amount= {totalPrice * 100}
                      name= 'All Products'>
                      </StripeCheckout>
                    
                    </div> 
                </div>  {/*end of summary*/}
             </div>  : '' } 

           

         </div>   

    )
}

export default Cart
