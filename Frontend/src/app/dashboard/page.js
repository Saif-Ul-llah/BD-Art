"use client";
import React, { useEffect, useState } from "react";

import AdminSideMenu from "../components/adminSideMenu";
import axios from "../../../utilis/axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let AdminLogin=localStorage.getItem("admin")
  
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/get-Orders");
        const data = response.data;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if(AdminLogin){
      fetchOrders();
    }else{
      router.push("/admin")
    }
   
  }, []);
 return (
    <div>
      <AdminSideMenu />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="p-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={order.products[0].productImage}
                        alt="Product Image"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {order.products[0].name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {order.products[0].category}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        className="w-40 h-20 rounded"
                        src={order.products[0].selectedFile}
                        alt="Product Image"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {order.products[0].dec}
                        </div>
                        <div className="font-normal text-gray-500">
                          Animation: {order.products[0].selectedOptions.animation}
                        </div>
                        <div className="font-normal text-gray-500">
                          Background: {order.products[0].selectedOptions.Background}
                        </div>
                        <div className="font-normal text-gray-500">
                          Character Proportion: {order.products[0].selectedOptions.Character_Proportion}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {order.userId.user_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.products[0].price}</td>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label>
                          <input
                            type="checkbox"
                            value={"1234"}
                            className="peer hidden"
                            name="playerId"
                            checked="true"
                          />
                          <div className="hover:bg-gray-50 flex items-center justify-between border-2 rounded-lg cursor-pointer text-sm border-gray-200 group ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-9 h-9 text-orange-500 invisible group-[.peer:checked+&]:visible"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
