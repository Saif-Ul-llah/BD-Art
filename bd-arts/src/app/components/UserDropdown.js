import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs'; // Assuming you are using react-icons for the person icon
import Link from 'next/link'; // Assuming you are using Next.js Link component


const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={toggleDropdown}
            className=""
          >
            <BsPerson />
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link href="/orders">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </div>
              </Link>
              <Link href="/">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Out
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default UserDropdown;
 