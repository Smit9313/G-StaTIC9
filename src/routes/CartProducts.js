import React from 'react';
import CartPage from '../components/cart/CartPage';
import '../Style/cart.css';
import Footer from './Footer'
// import Navbar from "../components/navbar/Navbar";

function CartProducts() {
  return (
    <>
    {/* <Navbar/> */}
    <div className='main-container'>
        <CartPage/>
    </div>
    <Footer/>
    </>
  )
}

export default CartProducts