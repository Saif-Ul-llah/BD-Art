'use client'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const home = () => {
 const router =useRouter()
  return (
    <div>
      <p>home</p>

      <div onClick={() => { signOut(); router.push("/signIn")}}>Sign Out </div>
    </div>
  )
}

export default home