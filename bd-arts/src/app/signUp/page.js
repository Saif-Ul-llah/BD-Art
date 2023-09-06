'use client'

import Image from 'next/image';
import React from 'react';
import bg from '@/app/img/bg.jpg'; //
import Link from 'next/link';

const SignUp = () => {
  return (
       
    <div>
      
      <div className=''>
        <Image src={bg} className='w-full absolute -z-10  h-screen'  alt='image'/>
      </div>

      <div className="">
        <div className="flex flex-col opacity-80  items-center justify-center py-36 px-6 md:py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-transparent border-2 border-white text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
              Create new account !
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div className='flex'>
                    <div>
                      <label htmlFor="firstName" className="block mb-2 text-sm font-medium">Your First Name</label>
                      <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-11/12 p-2.5 " placeholder="John" required="" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 text-sm font-medium ml-3">Your Last Name</label>
                      <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-11/12 p-2.5 ml-3" placeholder="Doe" required="" />
                      </div>
                    </div>  
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium  dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="cpassword" className="block mb-2 text-sm font-medium  dark:text-white">Confirm Password</label>
                  <input type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                {/* <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                </div> */}
                <button type="submit" className="w-full text-white bg-blue-900 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                <p className="text-sm font-bold text-black ">
                 Already have an account . <Link href="/signIn" className="font-medium text-blue-900 hover:underline ">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    
    
    </div>
  )
}

export default SignUp