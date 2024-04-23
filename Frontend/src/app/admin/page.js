"use client"


import axios from '../../../utilis/axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'



const Alogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const { data: session, status } = useSession();
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(true);
    
    
  const handleSignIn = async (e) => {
    e.preventDefault()
    // console.log(formData.email,formData.password)
    try {
      let bodyformData = new FormData();
      bodyformData.append("userEmail", formData.email);
      bodyformData.append("userPass", formData.password);

      axios({
        method: "post",
        url: "/admin",
        data: bodyformData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
        //   console.log(response);
          let success = response.data.statusText;
        //   const res ={...response.data.message}

          if (success == true || response.data) {
            localStorage.setItem("admin",true)
              router.push("/dashboard");
        } else {
            // Registration failed
            // Handle error, display an error message, or redirect the user accordingly.
            alert(response.data.message);
          }
        })

        .catch(function (error) {
          if (error.response) {
            console.log(`${error.response.status} \n${error.response.data}`);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
   <div>
    <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Admin Login
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" 
                      required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      id="password"
                      placeholder="••••••••" 
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required=""/>
                  </div>
            
                  <button type="submit" onClick={handleSignIn} class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign in</button>
              
              </form>
          </div>
      </div>
  </div>
</section>
   </div>
  )
}

export default Alogin