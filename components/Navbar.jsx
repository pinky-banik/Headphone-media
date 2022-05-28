import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Headphone Media</Link>
      </p>
      <button className='cart-icon' onClick="" type="button">
        <AiOutlineShopping/>
        <span className='cart-item-qty'>

        </span>
      </button>

    </div>
  )
}

export default Navbar