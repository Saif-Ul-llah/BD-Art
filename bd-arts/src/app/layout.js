'use client'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

export const metadata = {
  title: 'BD-Arts',
  description: 'Genrated by Wasif Engnieer!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
    
        <SessionProvider>
        {children}
        </SessionProvider>
        </body>
    </html>
  )
}
