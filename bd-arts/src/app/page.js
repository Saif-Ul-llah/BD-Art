'use client'
import React from 'react'
import Login from './signin/page'
import { SessionProvider } from 'next-auth/react'



const Home = () => {
  return (
    <div>
    <SessionProvider >
     <Login/>
   </SessionProvider>

  </div>
  )
}

export default Home