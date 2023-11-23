'use client'

import React, { useState } from 'react'
import Navbar from '../components/nav'
import Cart from '../components/cart';

const Order = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div>


  <div class="h-screen bg-[#170D18] ">
  <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
    <h1 class="mb-10 text-center text-2xl pt-6 font-bold text-white">Ordered</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src="" alt="product-image" class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
              <p class="mt-1 text-xs text-gray-700">36EU - 4US</p>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center p-10 space-x-4 my-auto">
                <p class="text-sm">259.000 ₭</p>
                
              </div>
            </div>
          </div>
        </div>

      </div>
 
    
    </div>
  </div>

    </div>
  )
}

export default Order
