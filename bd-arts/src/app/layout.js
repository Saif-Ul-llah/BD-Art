'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image';
import bg from '@/app/img/hombg.jpg';


export const metadata = {
  title: 'BD-Arts',
  description: 'Genrated by Wasif Engnieer!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <div>
       <Image src={bg} className='w-full absolute -z-10  h-screen'  alt='image'/>
     </div>
        <SessionProvider>
        {children}
        </SessionProvider>
        </body>
    </html>
  )
}
