"use client";

// Cart.js

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "../../../utilis/axios";
import { useRouter } from "next/navigation";

export default function Cart({ open, onClose }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [id, setId] = useState({});

  const fetchCartItems = async () => {
    try {
      let ide = JSON.parse(localStorage.getItem("UserData")) || {};
      const userId = ide._id;
      // console.log(userId);
      if (userId) {
        const response = await axios.get(`/get-cart-items/${userId}`);
        const data = await response.data;
        setCartItems(data.cartItems);
        localStorage.setItem("CartData", JSON.stringify(data.cartItems));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("UserData")));

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate subtotal whenever cartItems change
    const calculateSubtotal = () => {
      const total = cartItems.reduce((acc, item) => {
        return acc + item.productId.price;
      }, 0);
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const removeProduct = async (productId) => {
    try {
      // Make a DELETE request to the backend API
      await axios.delete(`/remove-product/${productId}`);
      fetchCartItems();
      // Update the local state or trigger a refetch of cart items
      // You might want to update the cartItems state or refetch the data from the server
    } catch (error) {
      console.error("Error removing product:", error.message);
    }
  };

  const OrderNow = () => {
    if (!id?.email) {
      router.push("/signIn");
    } else {
      localStorage.setItem("SubTotal", subtotal);
      router.push("/Payment");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartItems?.map((item) => (
                              <li
                                key={item.productId._id}
                                className="flex py-6"
                              >
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item?.productId.imageUrl}
                                    alt={item.productId.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item?.productId.name}</h3>
                                      <p className="ml-4">
                                        {item.productId.price}
                                      </p>
                                    </div>
                                    {/* <p className="mt-1 text-sm text-gray-500">
                                      Quantity {item?.quantity}
                                    </p> */}
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      <b>Selected Options :</b>{" "}
                                      <ul>
                                        {item.selectedOptions
                                          ? Object.entries(
                                              item.selectedOptions
                                            ).map(([key, value]) => (
                                              <li key={key}>
                                                {key}: {value}
                                              </li>
                                            ))
                                          : null}
                                      </ul>
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeProduct(item.productId._id)
                                        }
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={OrderNow}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or 
                          <button
                            type="button"
                            className="font-medium pl-2 text-indigo-600 hover:text-indigo-500"
                            onClick={onClose}
                          >
                             Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
