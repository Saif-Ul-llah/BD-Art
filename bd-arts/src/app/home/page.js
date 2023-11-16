'use client'


import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import Navbar from '../components/nav';
import { BiSolidRightArrow } from 'react-icons/bi'
import Link from 'next/link';
import Image from 'next/image';
import bg from '../../app/img/hombg.jpg'
import Cart from '../components/cart';


const home = () => {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div>
      <Image src={bg} className='w-full absolute -z-10  h-screen' alt='image' />
      <div>
        <Navbar openCart={openCart} />
        <Cart open={cartOpen} onClose={closeCart} />
        <div className='text-white md:mt-52 h-full ml-10'>
          <p className='text-9xl'>THE BDARTS</p>
          <p className='text-4xl ml-5'>Your Inspiration, Our Digital Palette</p>
          <Link href={'/carousel'} className='flex border-4 w-fit md:text-4xl bg-gray-800 bg-opacity-80 z-10 p-1 mt-4 ml-5 cursor-pointer'>Lets Start Journey <BiSolidRightArrow className='my-auto text-lg' /></Link>
          
        </div>
      </div>
    </div>
  )
}

export default home