'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Navbar from '../components/nav';
import Cart from '../components/cart';
import axios from '../../../utilis/axios';
import MineLoader from '../components/mineloader';


const PortfolioCards = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    // Fetch product data from your API endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/get-products'); // Update the API endpoint
        const data = await response.data;
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
       <div>
   <div className='w-full h-full   bg-purple-400'>

  
  <section class="py-10">
    
  <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
      
       <article class="rounded-xl p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:bg-blue-800">
        <Link href={"/portfolio"} passHref>
        <img className='w-full h-full rounded-xl' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PQrfetgY4SUIL21j3BwLwIqRgFCrQh3BZQ&usqp=CAU"}/>
        </Link>
      </article>

      <article class="rounded-xl p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:bg-blue-800">
        <Link href="/portfolio"passHref>
          <img class='w-full h-full rounded-xl' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PQrfetgY4SUIL21j3BwLwIqRgFCrQh3BZQ&usqp=CAU"/>
        </Link>
      </article>

      <div className='flex flex-col'>
        
        <article class="rounded-xl p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:bg-blue-800">
            <Link href="/portfolio"passHref>
              <img class="w-full h-full rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PQrfetgY4SUIL21j3BwLwIqRgFCrQh3BZQ&usqp=CAU" alt="Hotel Photo" />
            </Link>
        </article>

        <article class="rounded-xl p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:bg-blue-800">
            <Link href="/portfolio"passHref>
              <img class="w-full h-full rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PQrfetgY4SUIL21j3BwLwIqRgFCrQh3BZQ&usqp=CAU" alt="Hotel Photo" />
            </Link>
        </article>


      
      </div>

      </div>

      <div className='flex mt-20'>
        <div className='flex  flex-row-reverse' >

          <div className='flex flex-row-reverse w-full text-3xl '>
          
          <div className='bg-white h-10 border-black w-auto transform skew-x-12 rounded-md' >
            <p className=''>None</p>
          </div>
  
          <p>Category:</p>
        

        </div>
      <h2 className='text-white text-6xl ml-24'> Portfolio </h2>

      
      </div>
      </div>
      
      {loading ? ( // Render loader if loading is true
           <MineLoader/>
          ) : (
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Repeat the same mapping logic for the product cards */}
            {products.map((product) => (
              <article
                key={product._id}
                className="rounded-xl p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 hover:bg-blue-800"
              >
                <Link href={`/Products/${product._id}`}passHref>
                
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-96 rounded-xl"
                      />
                    </div>
                      <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 my-2 text-white duration-100 hover:bg-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          {/* Your SVG path here */}
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <button className="text-sm">Details</button>
                      </div>
                 
                </Link>
              </article>
            ))}
          </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PortfolioCards;
