"use client";
import axios from "../../../utilis/axios";
import AdminSideMenu from "../components/adminSideMenu";
import React, { useState } from "react";

const Promo_Codes = () => {
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: Number,
    isActive: true,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
   
  const addPromo = async () => {
    try {
      const response = await axios.post("/create-promo", formData);
      console.log(response);
      if (response.status === 200) {
        const result = response.data;
        console.log("Promo code added successfully:", result);
        // You can add further logic here, like displaying a success message
      } else {
        const error = response.data;
        console.error("Error adding promo code:", error.error);
        // You can handle the error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error adding promo code:", error.message);
      // You can handle network errors or other exceptions here
    }
  };
  
  return (
    <div>
      <AdminSideMenu />

      <div className="p-4 sm:ml-64">
        <div className="flex p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="w-1/2">
            <div>
              <label
                htmlFor="CODE_NAME"
                className="block m-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                CODE NAME :
              </label>
              <input
                type="text"
                name="code"
                id="CODE_NAME"
                value={formData.code}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="CODE NAME"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discount_value"
                className="block m-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Discount_Value :
              </label>
              <input
                type="number"
                name="discountPercentage"
                id="discount_value"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Discount_value"
                required
              />
            </div>
          </div>
          <div className="flex w-full h-10 justify-center my-auto">
            <button
              onClick={addPromo}
              className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="button"
            >
              Add-Promo-Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promo_Codes;
