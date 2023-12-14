"use client";

import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs"; // Assuming you are using react-icons for the person icon
import Link from "next/link"; // Assuming you are using Next.js Link component
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("UserData"));
    setUser(data);
    // console.log(user);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={toggleDropdown} className=" flex">
          <BsPerson /><div className="md:hidden">Login / Register</div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute  md:right-0  mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="block cursor-pointer px-4 py-2 text-xl text-gray-700 hover:bg-gray-100">
              {user?.user_name}
            </div>
            
            <div>
              {user?.email ? (
               <div>
                 <Link href="/Orders">
                <div className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </div>
              </Link>
                <div
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    localStorage.clear();
                  }}
                  className="flex cursor-pointer float-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </div>
               </div>
              ) : (
                <div
                  onClick={() => {
                    router.push("/signIn");
                  }}
                  className="flex cursor-pointer float-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Login
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
