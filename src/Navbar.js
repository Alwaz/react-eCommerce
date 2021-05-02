import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import {CartContext} from './CartContext'

const Navbar = () => {

    const{qty}=useContext(CartContext)

    return (
        <div>
            <nav>
            <ul className='navbar__shopName'>
                <li><Link to='/'>PickBazaar</Link></li>
            </ul>

            <ul className='navbar__cart'>
                <li>
                    <Link to="cart">
                    <span className='cartIcon'>
                        <i class="fas fa-shopping-cart"></i>
                       <span className='cartCount'>{qty}</span>
                    </span>
                    </Link>
                </li>
            </ul>
        </nav>
            
            
        </div>
    )
}

export default Navbar
