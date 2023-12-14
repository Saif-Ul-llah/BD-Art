// Import statements
"use client";
import React, { useEffect, useState } from "react";
import { TfiShoppingCartFull } from "react-icons/tfi";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import UserDropdown from "./UserDropdown";

const Navbar = ({ openCart }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div id="ft" className="text-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div className="flex items-center">
          <Link
            href={"/home"}
            className="self-center md:text-3xl p-2 text-xl font-semibold whitespace-nowrap dark:text-white"
          >
            BrandWave Digital
          </Link>
        </div>
        <div className="flex md:flex-row-reverse items-center mt-2 md:-mr-72">
          <Link
            href="#"
            id="cart-link"
            className="block md:text-3xl md:ml-5 rounded hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            <TfiShoppingCartFull className="text-white" />
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="flex items-center ml-3 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden  dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:w-auto mt-1 md:flex md:items-center md:justify-end`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col text-white p-2 border border-gray-100 rounded-lg md:flex-row md:border-none md:space-x-4">
            <li>
              <Link
                href="/home"
                id="ft"
                className="block md:py-0  py-2 pl-3 md:text-3xl pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/PreMadeArt"
                id="ft"
                className="block md:py-0  py-2 pl-3 md:text-3xl pr-4 md:hover:bg-transparent md:border-0  md:p-0 "
              >
                Pre-Made Art
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                id="ft"
                className="block md:py-0  py-2 pl-3 md:text-3xl pr-4 md:hover:bg-transparent md:border-0  md:p-0 "
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/AboutUs"
                id="ft"
                className="block md:py-0  py-2 pl-3 md:text-3xl pr-4 rounded md:hover:bg-transparent md:border-0 md:p-0"
              >
                About Us
              </Link>
            </li>
            <li className='md:text-3xl'>
              <UserDropdown  />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
