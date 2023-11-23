"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import bg from "../../app/img/bg.jpg";
import Navbar from "../components/nav";
import axios from "../../../utilis/axios";
import Cart from "../components/cart";
import Loader from "../components/loader";

const Pay = () => {
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    discountCode: "",
    payment: "",
    total: Number,
  });
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };
  const [data, setdata] = useState(true);
  const closeCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    let sub = localStorage.getItem("SubTotal");
    // console.log(sub);
    setFormData({
      ...formData,
      total: sub,
    });
    setdata(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    let cart = JSON.parse(localStorage.getItem("CartData"));
    let total = JSON.parse(localStorage.getItem("SubTotal"));

    if (formData.payment == "stripe") {
      let response = axios.post("/create-checkout-session", { cart });
    } else if (formData.payment == "paypal") {
      let response = axios.post("/pay", { cart, total });
    }
  };

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
        <Navbar openCart={openCart} />
        <Cart open={cartOpen} onClose={closeCart} />
        {data ? (
          <Loader />
        ) : (
          <div className="flex flex-col opacity-80  items-center justify-center px-6 md:py-8 mx-auto w-screen lg:py-0">
            <div className="w-screen  bg-transparent text-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex mx-auto md:gap-x-64 p-6  sm:p-8">
                {/* <form onSubmit={handleSubmit}> */}
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
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
                      className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                      placeholder="Email"
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
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        id="country"
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
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          id="firstName"
                          className=" border-2 bg-transparent my-2 border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                          placeholder="First Name"
                          required=""
                        />
                      </div>
                      {/* Last Name */}
                      <div className="md:my-3">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          id="lastName"
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
                        value={formData.phoneNumber}
                        onChange={handleChange}
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
                  <div className="flex">
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
                        value={formData.discountCode}
                        onChange={handleChange}
                        id="discountCode"
                        className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block  md:p-2.5"
                        placeholder="Discount Code"
                        required=""
                      />
                    </div>

                    <div className="flex w-full justify-center items-center  text-[#4b214c] font-bold md:text-3xl">
                      <button className="mx-auto md:mt-8 md:p-3 p-2 rounded-md bg-white">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex my-3">
                      <label className="text-2xl leading-tight tracking-widest  ">
                        Sub-Total
                      </label>
                      <p className="text-2xl ml-20 leading-tight tracking-widest  ">
                        {formData.total}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex my-3">
                      <label className="text-2xl leading-tight tracking-widest  ">
                        Tax-Fee
                      </label>
                      <p className="text-2xl leading-tight tracking-widest  "></p>
                    </div>
                  </div>
                  <div>
                    <label
                      name="total"
                      id="total"
                      className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block w-full md:p-2.5"
                      placeholder="Total"
                      required=""
                    >
                      Total:
                    </label>
                  </div>
                  <div className="flex mt-5">
                    <input
                      type="radio"
                      onChange={handleChange}
                      value="paypal"
                      name="payment"
                      className="mr-2"
                    />
                    <img src="/Paypal logo.png" className="w-30  h-10" />
                  </div>
                  <div className="flex mt-5 ">
                    <input
                      type="radio"
                      onChange={handleChange}
                      value="stripe"
                      name="payment"
                      className="mr-2"
                    />
                    <img src="/Stripe_logo.png" className="w-30 bg-gray-600 rounded-lg h-10" />
                  </div>
                  <div className="flex w-full justify-center items-center  text-[#4b214c] font-bold text-3xl">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="mx-auto md:w-52 p-3 mt-2 rounded-md bg-white"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pay;
