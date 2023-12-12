"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/nav";
import Cart from "../components/cart";
import MineLoader from "../components/mineloader";
import axios from "../../../utilis/axios";
import { useRouter } from "next/navigation";

const PreMadeArt = () => {
  const router = useRouter();
  const [PreMadeArt, setPreMadeArt] = useState([]);
  const [loading, setLoading] = useState(true);
  // const productId = params.params.id;
  const isMounted = useRef(true);
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  useEffect(() => {
    const fetchPreMadeArt = async () => {
      try {
        const response = await axios.get("/get-PreMadeArt");
        setPreMadeArt(response.data);
        // console.log(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPreMadeArt();
    const userData = JSON.parse(localStorage.getItem("UserData")) || null;
    setUserId(userData);
  }, []);

  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };
  const closeCart = () => {
    setCartOpen(false);
  };

  const handleAddToCart = async (params) => {
    if (!userId) {
      if (isMounted.current && router) {
        router.push("/signIn");
      }
    } else {
      try {
        setLoading(true);
        const formData = {
          productId: productDetail,
          userId: userId,
          selectedOptions: "",
          description: "Pre-Made Art",
          img: "",
        };
        const cartResponse = await axios.post("/update-cart", formData);
        // console.log(formData);
        if (cartResponse.data.message) {
          router.push("/home");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen bg-[#170D18]">
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      {loading ? (
        <div className="h-full my-auto">
          <MineLoader />
        </div>
      ) : (
        <section class="py-10 bg-[#170D18]">
          <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {PreMadeArt.map((item) => (
              <article class="rounded-xl bg-white p-3 overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <a href="#">
                  <div className="overflow-hidden h-32">
                    <div class="relative hover:rotate-45 hover:-mt-10 hover:-ml-10 hover:w-96 hover:h-64 h-32 select-none flex items-end overflow-hidden rounded-xl">
                      <img src={item.imageUrl} alt="Hotel Photo" />
                    </div>
                  </div>

                  <div class="mt-1 p-2">
                    <h2 class="text-slate-700">{item.name}</h2>
                    <p class="mt-1 text-sm text-slate-400">{item.category}</p>

                    <div class="mt-3 flex items-end justify-between">
                      <p class="text-lg font-bold text-blue-500">
                        ${item.price}
                      </p>

                      <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>

                        <button
                          class="text-sm"
                          onClick={() => {
                            setProductDetail(item);
                            // handleAddToCart();
                            setModal(true);
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
      <div>
        {/* Main modal */}
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            modal ? "block" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 
        left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="flex justify-center items-center p-4 w-screen bg-black bg-opacity-70 h-screen">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex w-full items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                 Pre-Made Art
                </h3>
                <button
                  type="button"
                  className="text-red-800 bg-transparent hover:bg-red-800 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={() => setModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                  <div className="lg:w-11/12 mx-auto flex flex-wrap">
                    <img
                      alt="ecommerce"
                      className="lg:w-1/2 w-full lg:h-full h-64 object-cover object-center rounded"
                      src={productDetail?.imageUrl}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        THE BD-ART
                      </h2>
                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                        {productDetail?.name}
                      </h1>
                      <p className="leading-relaxed">
                        {productDetail?.category}
                      </p>
                      <div className="flex md:mt-6 items-center pb-5 border-b-2 border-gray-100 md:mb-5"></div>
                      <div className="flex py-10">
                        <span className="title-font font-medium text-2xl text-gray-900">
                          {" "}
                          ${productDetail?.price}
                        </span>
                        <button 
                        onClick={()=>{handleAddToCart()}}
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                          Add-To-Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreMadeArt;
