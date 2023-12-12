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
    promoCode: "",
    payment: "",
    total: Number,
    apply: true,
  });
  const [formErrors, setFormErrors] = useState({});
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
    console.log(typeof parseInt(sub));
    setFormData({
      ...formData,
      total: parseInt(sub),
    });
    setdata(false);
  }, []);

  const validateForm = () => {
    const errors = {};
    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Validate country
    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    // Validate payment
    if (!formData.payment) {
      errors.payment = "Payment method is required";
    }
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let user = JSON.parse(localStorage.getItem("UserData"));
      let cart = JSON.parse(localStorage.getItem("CartData"));
      // let total = JSON.parse(localStorage.getItem("SubTotal"));
      let total = formData.total;
      if (formData.payment == "stripe") {
        const makeStirpeRequest = async () => {
          try {
            setdata(true);
            // Make the stripe payment request
            let response = await axios.post("/create-checkout-session", {
              cart,
              user,
             total, 
            });
            // console.log(response);

            // Check if the response contains the 'approveLink'
            if (response.data.url) {
              // Open the 'approveLink' in a new window
              // let res = await axios.post("/DBandEmail", {
              //   cart,
              //   user,
              //   total,
              // });
              // if(res.status==201){
                setdata(false);
                // window.open(response.data, "_blank");
                window.location.href=response.data.url
              // }
            } else {
              console.error("No 'approveLink' found in the Stripe response.");
              setdata(false);
            }
          } catch (error) {
            console.error("Error making Stripe payment request:", error);
          }
        };

        // Invoke the function
        makeStirpeRequest();
      } else if (formData.payment === "paypal") {
        // Wrap the asynchronous code in a function
        const makePayPalRequest = async () => {
          try {
            setdata(true);
            // Make the PayPal payment request
            const response = await axios.post("/pay", { cart, total, user });
            // console.log(response);

            // Check if the response contains the 'approveLink'
            if (response.data && response.data.href) {
              // Open the 'approveLink' in a new window
              setdata(false);
              window.open(response.data.href, "_blank");
            } else {
              console.error("No 'approveLink' found in the PayPal response.");
            }
          } catch (error) {
            console.error("Error making PayPal payment request:", error);
          }
        };

        // Invoke the function
        makePayPalRequest();
      }
    }
  };

  const applyPromoCode = async () => {
    try {
      const response = await axios.post("/apply-promo", formData);

      if (response) {
        const result = await response.data;
        // Update UI with applied discount
        // console.log(typeof(result.discountPercentage));

        // Check if discountPercentage is a valid number
        const discountPercentage = parseInt(result.discountPercentage);
        if (!isNaN(discountPercentage) && formData.apply) {
          setFormData({
            ...formData,
            total: formData.total - discountPercentage,
            apply: false,
          });

          // console.log("Discount applied:", discountPercentage);
        } else {
          console.error(
            "Invalid discountPercentage:",
            result.discountPercentage
          );
        }
      } else {
        const error = await response.data;
        console.error("Error applying promo code:", error.error);
      }
    } catch (error) {
      console.error("Error applying promo code:", error.message);
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
                      className={`border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white rounded-lg block w-full md:p-2`}
                      placeholder="Email"
                      required=""
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-lg">{formErrors.email}</p>
                    )}
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
                       {formErrors.country && (
                      <p className="text-red-500 text-lg">{formErrors.country}</p>
                    )}
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
                         {formErrors.firstName && (
                      <p className="text-red-500 text-lg">{formErrors.firstName}</p>
                    )}
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
                         {formErrors.lastName && (
                      <p className="text-red-500 text-lg">{formErrors.lastName}</p>
                    )}
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
                       {formErrors.phoneNumber && (
                      <p className="text-red-500 text-lg">{formErrors.phoneNumber}</p>
                    )}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 ">
                  {/* Promo Code  */}
                  <div className="flex">
                    <div>
                      <label
                        htmlFor="promoCode"
                        className="text-xl font-bold leading-tight tracking-widest  md:text-4xl "
                      >
                        Billing
                      </label>
                      <input
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleChange}
                        id="promoCode"
                        className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg block  md:p-2.5"
                        placeholder="Discount Code"
                        required=""
                      />
                    </div>

                    <div className="flex w-full justify-center items-center  text-[#4b214c] font-bold md:text-3xl">
                      <button
                        onClick={applyPromoCode}
                        className="mx-auto md:mt-8 md:p-3 p-2 rounded-md bg-white"
                      >
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
                    <div
                      className=" border-2 bg-transparent border-white md:text-2xl text-white placeholder:text-white  rounded-lg flex w-full md:p-2.5">

                    <label
                      name="total"
                      id="total"
                      placeholder="Total"
                      required=""
                      >
                      Total: 
                    </label>
                    <p className="text-2xl ml-auto leading-tight tracking-widest  ">
                        {formData.total}
                      </p>
                  </div>
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
                    <img
                      src="/Stripe_logo.png"
                      className="w-30 bg-gray-600 rounded-lg h-10"
                    />
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
