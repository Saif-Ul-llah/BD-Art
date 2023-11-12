"use client";
import React, { useEffect } from "react";
import { TfiShoppingCartFull } from "react-icons/tfi";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import UserDropdown from "./UserDropdown";

const Navbar = ({ openCart }) => {
  useEffect(() => {
    const link = document.getElementById("cart-link");
    if (link) {
      link.addEventListener("click", openCart);
    }
    return () => {
      if (link) {
        link.removeEventListener("click", openCart);
      }
    };
  }, [openCart]);

  return (
    <div id="ft" className="text-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Link
            href={"/home"}
            className="self-center md:text-4xl text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            BrandWave Digital
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col text-4xl text-white p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                href="/home"
                id="ft"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                id="ft"
                className="block py-2 pl-3 pr-4 hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 "
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="#"
                id="ft"
                className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                id="cart-link"
                className="block py-2 pl-3 pr-4 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <TfiShoppingCartFull className="text-white" />
              </Link>
            </li>
            <li>
              <UserDropdown />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
