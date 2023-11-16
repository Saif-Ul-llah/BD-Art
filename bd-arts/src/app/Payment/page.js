"use client";

import React from "react";
import Image from "next/image";
import bg from "@/app/img/bg.jpg";
import Navbar from "../components/nav";

const Pay = () => {
  return (
    <div className="md:h-screen">
      <div>
        <Image
          src={bg}
          className="w-full absolute -z-10  h-screen"
          alt="image"
        />
      </div>
      <div className="">
        <Navbar />
        <div className="flex flex-col opacity-80  items-center justify-center px-6 md:py-8 mx-auto w-screen lg:py-0">
          <div className="w-screen  bg-transparent text-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex mx-auto md:gap-x-64 p-6  sm:p-8">
              <div>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-xl font-bold leading-tight tracking-widest md:text-4xl "
                  >
                    Contact
                  </label>
                  <input
                    type="email"
                    name="email"
                    // value={formData.email}
                    // onChange={handleChange}
                    id="email"
                    className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  {/* Country name */}
                  <div className="md:mt-5">
                    <label
                      htmlFor="Personal Information"
                      className="text-xl font-bold mt-6  md:text-4xl "
                    >
                      Personal Information
                    </label>
                    <input
                      type="text"
                      name="Country"
                      // value={formData.email}
                      // onChange={handleChange}
                      id="Country"
                      className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                      placeholder="Country Name"
                      required=""
                    />
                  </div>
                  <div className="grid grid-cols-2">
                    {/* First Name */}
                    <div className="md:my-3">
                      <input
                        type="text"
                        name="name"
                        // value={formData.email}
                        // onChange={handleChange}
                        id="name"
                        className=" border-2 bg-transparent my-2 border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                        placeholder="First Name"
                        required=""
                      />
                    </div>
                    {/* Last Name */}
                    <div className="md:my-3">
                      <input
                        type="text"
                        name="lanme"
                        // value={formData.email}
                        // onChange={handleChange}
                        id="lname"
                        className=" border-2 bg-transparent my-2 ml-2 md:ml-5 border-white md:text-2xl text-white placeholder:text-white rounded-lg block w-full md:w-11/12 md:p-2.5"
                        placeholder="Last Name"
                        required=""
                      />
                    </div>
                  </div>
                  {/* Phone Number */}
                  <div>
                    <input
                      type="number"
                      name="phoneNumber"
                      // value={formData.email}
                      // onChange={handleChange}
                      id="phoneNumber"
                      className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                      placeholder="Phone Number"
                      required=""
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 ">
                {/* Promo Code  */}
                <div>
                  <label
                    htmlFor="discountCode"
                    className="text-xl font-bold leading-tight tracking-widest  md:text-4xl "
                  >
                    Billing
                  </label>
                  <input
                    type="text"
                    name="discountCode"
                    // value={formData.email}
                    // onChange={handleChange}
                    id="email"
                    className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                    placeholder="Discount Code"
                    required=""
                  />
                </div>

                <div>
                  <div className="flex my-3">
                    <label className="text-2xl leading-tight tracking-widest  ">
                      Sub-Total
                    </label>
                    <p className="text-2xl leading-tight tracking-widest  ">
                      Amount comes here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
