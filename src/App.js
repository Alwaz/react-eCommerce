import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Cart from './Cart'
import NotFound from './NotFound'
import ProductsContextProvider from './ProductsContext'
import Products from './Products'
import CartContextProvider from './CartContext'
import './products.css'

function App() {
  return (
    <div>
      <ProductsContextProvider>
       <CartContextProvider>  
        <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Products}/> 
            <Route path='/cart' exact component={Cart}/>
            <Route component={NotFound}/>
          </Switch>
          
        </Router>
      </CartContextProvider> 
        
      </ProductsContextProvider>
    </div>
  );
}

export default App;
