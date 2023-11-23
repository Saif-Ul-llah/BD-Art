'use client'
import React from 'react'
import Home1 from './home/page'
import { SessionProvider } from 'next-auth/react'



const Home = () => {
  return (
    <div>
      <Home1/>
    {/* <SessionProvider >
     <Login/>
   </SessionProvider> */}

  </div>
  )
}

export default Home