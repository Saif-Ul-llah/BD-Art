"use client";
import React, { useState, useEffect } from "react";
import axios from "../../../utilis/axios";
import Navbar from "../components/nav";
import Cart from "../components/cart";
import Link from "next/link";
import MineLoader from "../components/mineloader";

const Order = () => {
  let userData = JSON.parse(localStorage.getItem("UserData"));
  let userId = userData._id;
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        // Replace "YOUR_SERVER_ENDPOINT" with the actual endpoint
        const response = await axios.get(`/orders/${userId}`);
        setOrders(response.data);
        // console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className=" h-screen bg-[rgb(23,13,24)]">
      <div className="h-full bg-[#170D18] ">
        <Navbar openCart={openCart} />
        <Cart open={cartOpen} onClose={closeCart} />
        <h1 className="mb-10 text-center text-4xl pt-6 font-bold text-white">
          Ordered
        </h1>
        <div className="mx-auto w-full pb-5 justify-center px-6 bg-[#170D18] xl:px-0">
          {loading ? (
           <MineLoader/>
          ) : orders.length === 0 ? (
            <p className="mb-10 text-center text-4xl pt-6 font-bold text-white">No orders found.</p>
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order._id} className="rounded-lg mx-auto md:w-2/3">
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="justify-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <img
                        src={product.productImage}
                        alt="product-image"
                        className="md:w-1/2  h-60 rounded-lg sm:w-40"
                      />
                      <div className="md:ml-28 sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {product.name}
                          </h2>
                          <p className="mt-1 text-2xl text-gray-700">
                            {product.dec}
                          </p>
                          <p className="mt-1 text-2xl text-gray-700">
                            <ul>
                              {Object.entries(product.selectedOptions).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    <strong>{key}:</strong> {value}
                                  </li>
                                )
                              )}
                            </ul>
                          </p>
                          <p className="text-2xl text-blue-600">
                            {product.selectedFile ? (
                              <Link href={product.selectedFile}>
                                Click for Reference Image
                              </Link>
                            ) : null}
                          </p>
                        </div>
                        <div className="md:mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block ">
                              <div className="md:ml-14 text-green-600 border-green-600 border-2 w-10 text-center rounded-xl items-center">
                                Paid
                              </div>
                          <div className="flex items-center md:p-10  space-x-4 my-auto">
                            <p className="text-3xl text-[#F96906]">${product.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
