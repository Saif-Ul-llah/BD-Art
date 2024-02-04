"use client";

import instance from "../../../utilis/axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Axios from "axios";

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    Background: {}, // Initialize optional fields as empty objects
    animation: {},
    Character_Proportion: {},
    Rigging: {},
    Overlay_Type: {},
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles.currentTarget.files[0];
    // handleFile(file);
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleFileInputChange = (e) => {
    const file = e.currentTarget.files[0];
    // handleFile(file);
    setSelectedFile(file);
  };

  const isValidFile = (file) => {
    // Define allowed file extensions and MIME types
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const allowedMimeTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    // Get the file extension and MIME type
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileMimeType = file.type.toLowerCase();

    // Check if the file extension and MIME type are allowed
    return (
      allowedExtensions.includes(fileExtension) &&
      allowedMimeTypes.includes(fileMimeType)
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name ,value)
    if (
      name == "Background" ||
      name == "animation" ||
      name == "Character_Proportion" ||
      name == "Rigging" ||
      name == "Overlay_Type"
    ) {
      setFormData({
        ...formData,
        [name]: { ...formData[name], [value]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const nextStep = () => {
    // console.log(formData);
    // if (validateForm()) {
    setStep(step + 1);
    // }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
  
      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", selectedFile);
      cloudinaryData.append("upload_preset", "userCart");
      cloudinaryData.append("cloud_name", "saif-ul-llah");
  
      const cloudinaryResponse = await Axios.post(
        "https://api.cloudinary.com/v1_1/saif-ul-llah/image/upload",
        cloudinaryData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      const imageUrl = cloudinaryResponse?.data?.url;
  
      // Prepare data to send to the server
      const formDataToSend = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        imageData: imageUrl,
      };
  
      // Handle optional fields
      const optionalFieldNames = [
        "Background",
        "animation",
        "Character_Proportion",
        "Rigging",
        "Overlay_Type",
      ];
  
      optionalFieldNames.forEach((fieldName) => {
        const optionalFieldData = formData[fieldName];
        formDataToSend[fieldName] = JSON.stringify(optionalFieldData);
      });
  
      // Send data to the server
      const response = await instance.post("/add-product", formDataToSend);
  
      // Check the server response
      if (response.status === 201) {
        console.log("Product added successfully");
        // Additional logic after successful submission
        closeModal();
        setStep(1);
        setSelectedFile(null);
      } else {
        // Check the response data for more details on failure
        console.error("Failed to add product", response.data);
        // Handle error
      }
    } catch (error) {
      // Log the entire error object for detailed information
      console.error("Error adding product:", error.message);
      // Handle error
    }
  };
  
  const renderForm = () => {
    switch (step) {
      case 1:
        return product();
      case 2:
        if (formData.category == "Emote") {
          return subCatEmote();
        } else if (formData.category == "Vtuber") {
          return subCatVtuber();
        } else if (
          formData.category == "Anime" ||
          formData.category == "DND_Character" ||
          formData.category == "OC_Art" ||
          formData.category == "Furry" ||
          formData.category == "PNG_Tuber" ||
          formData.category == "Portrait"
        ) {
          return subCatAnime();
        } else if (formData.category == "Overlay") {
          return subCatOverlay();
        } else if (
          formData.category == "Background" ||
          formData.category == "Banner" ||
          formData.category == "Panels"
        ) {
          return subCatBackground();
        }
      default:
        return product();
    }
  };

  const product = () => {
    return (
      <div>
        <div className="grid gap-4 mb-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="" disabled>
                Select category
              </option>
              {/* categeries no 1 */}
              <option value="Anime">Anime</option>
              <option value="DND_Character">DND Character</option>
              <option value="OC_Art">OC Art</option>
              <option value="Furry">Furry</option>
              <option value="PNG_Tuber">PNG Tuber</option>
              <option value="Portrait">Portrait</option>
              {/* next categeries  2*/}
              <option value="Background">Background</option>
              <option value="Banner">Banner</option>
              <option value="Panels">Panels</option>
              {/* categeries no 3 */}
              <option value="Overlay">Overlay</option>
              {/* categeries no 4 */}
              <option value="Emote">Emote</option>
              {/* categeries no 5 */}
              <option value="Vtuber">Vtuber</option>
            </select>
          </div>
        </div>
        {/* Image input feild */}
        <div>
          <label
            htmlFor="imageInput"
            className={`relative cursor-pointer ${
              selectedFile ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex flex-col items-center">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Product"
                  className="w-full h-auto rounded-lg mb-2 "
                />
              ) : (
                <div className="flex flex-col items-center w-full border-2 border-gray-400 border-dashed">
                  <svg
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <p className="text-gray-500 text-center mt-2">
                    Click to select an image
                  </p>
                </div>
              )}
              {/* Hidden file input */}
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </label>
        </div>

        <div className="mt-4 ">
          <label>
            <b>Step</b> 1 of 3{" "}
          </label>
          <button
            type="button"
            onClick={nextStep}
            className="float-right inline-block w-full rounded-lg bg-blue-700 px-5 py-3 font-medium text-white sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const subCatEmote = () => {
    return (
      <div>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className="">
            <label
              htmlFor="Emote-style"
              className="block mb-2 md:grid grid-cols-3 text-lg font-medium text-gray-900 dark:text-white"
            >
              Emote Style :
            </label>
            <div>
              {/* Checkbox for Chibbi */}
              <input
                type="checkbox"
                id="Chibbi"
                name="Emote style"
                value="Chibbi"
                // checked={formData.Emote_style.includes("Chibbi")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Chibbi" className="mr-4">
                Chibbi
              </label>

              {/* Checkbox for Anime */}
              <input
                type="checkbox"
                id="Anime"
                name="Emote style"
                value="Anime"
                // checked={formData.Emote_style.includes("Anime")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Anime" className="mr-4">
                Anime
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Animation :
            </label>
            <div className="">
              {/* Checkbox for Yes */} 
              <input
                type="checkbox"
                id="Yes"
                name="Animation"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="Animation"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4">
          <label>
            <b>Step</b> 2 of 2{" "}
          </label>
          <div className=" float-right">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </div>
        </div>
      </div>
    );
  };
  const subCatVtuber = () => {
    return (
      <div>
        {formData.category}
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className="border-2 md:grid grid-cols-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Background :
            </label>
            <br />
            <div className="">
              {/* Checkbox for Yes */}
              <input
                type="checkbox"
                id="Yes"
                name="Background"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="Background"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>
            </div>
          </div>

          <div className="border-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Character Proportion :
            </label>
            <div className="">
              <input
                type="checkbox"
                id="headshot"
                name="Character_Proportion"
                value="Headshot"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Headshot</label>

              <input
                type="checkbox"
                id="Half Body"
                name="Character_Proportion"
                value="Half Body"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Half_Body</label>

              <input
                type="checkbox"
                id="Full Body"
                name="Character_Proportion"
                value="Full Body"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Full Body</label>
            </div>
          </div>

          <div className="border-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Rigging :
            </label>
            <div className="">
              {/* Checkbox for Yes */}
              <input
                type="checkbox"
                id="Yes"
                name="Rigging"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="Rigging"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label>
            <b>Step</b> 2 of 2{" "}
          </label>
          <div className=" float-right">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </div>
        </div>
      </div>
    );
  };
  const subCatAnime = () => {
    return (
      <div>
        <label className="block mb-2 md:grid grid-cols-3 text-lg font-medium text-gray-900 dark:text-white">
          {formData.category} :
        </label>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className="border-2 md:grid grid-cols-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Background :
            </label>
            <br />
            <div className="">
              {/* Checkbox for Yes */}
              <input
                type="checkbox"
                id="Yes"
                name="Background"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="Background"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>

          
            </div>
          </div>

          <div className="border-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Animation :
            </label>
            <div className="">
              {/* Checkbox for Yes */}
              <input
                type="checkbox"
                id="Yes"
                name="animation"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="animation"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>
            </div>
          </div>

          <div className="border-2">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Character Proportion :
            </label>
            <div className="">
              <input
                type="checkbox"
                id="headshot"
                name="Character_Proportion"
                value="Headshot"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Headshot</label>
              <input
                type="checkbox"
                id="Half Body"
                name="Character_Proportion"
                value="Half_Body"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Half_Body</label>

              <input
                type="checkbox"
                id="Full Body"
                name="Character_Proportion"
                value="Full Body"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="mr-4">Full Body</label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label>
            <b>Step</b> 2 of 2{" "}
          </label>
          <div className=" float-right">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </div>
        </div>
      </div>
    );
  };
  const subCatOverlay = () => {
    return (
      <div>
        {formData.category} :
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div className="border-2 md:grid grid-cols-2 p-5">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Animation :
            </label>
            <div className="">
              {/* Checkbox for Yes */}
              <input
                type="checkbox"
                id="Yes"
                name="animation"
                value="Yes"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Yes" className="mr-4">
                Yes
              </label>

              {/* Checkbox for No */}
              <input
                type="checkbox"
                id="No"
                name="animation"
                value="No"
                // checked={formData.Animation.includes("No")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="No" className="mr-4">
                No
              </label>
            </div>
          </div>

          <div className="border-2 md:grid grid-cols-2 p-5">
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Overlay types :
            </label>
            <div className="">
              <input
                type="checkbox"
                id="Cam Overlay"
                name="Overlay_Type"
                value="Cam Overlay"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Cam Overlay" className="mr-4">
                Cam Overlay
              </label>
              <br />

              <input
                type="checkbox"
                id="Chat Overlay"
                name="Overlay_Type"
                value="Chat Overlay"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Chat Overlay" className="mr-4">
                Chat Overlay
              </label>
              <br />

              <input
                type="checkbox"
                id="Full Stream Package"
                name="Overlay_Type"
                value="Full Stream Package"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Full Stream Package" className="mr-4">
                Full Stream Package
              </label>
              <br />

              <input
                type="checkbox"
                id="Stream Overlay"
                name="Overlay_Type"
                value="Stream Overlay"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Stream Overlay" className="mr-4">
                Stream Overlay
              </label>
              <br />

              <input
                type="checkbox"
                id="Stream Screens"
                name="Overlay_Type"
                value="Stream Screens"
                // checked={formData.Animation.includes("Yes")} // Uncomment and modify accordingly
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Stream Screens" className="mr-4">
                Stream Screens
              </label>
              <br />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label>
            <b>Step</b> 2 of 2{" "}
          </label>
          <div className=" float-right">
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </div>
        </div>
      </div>
    );
  };
  const subCatBackground = () => {
    return (
      <div>
        {formData.category} :
        <p className="text-2xl">Everthing is fine to Add New Product</p>
        <div className="mt-4">
          <label>
            <b>Step</b> 2 of 2{" "}
          </label>

          <div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
            >
              <svg
                className="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </div>
        </div>
      </div>
    );
  };

  
  return (
    <div>
      {/* Modal toggle */}
      <div className="flex justify-center m-5">
        <button
          onClick={openModal}
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Create product
        </button>
      </div>

      {/* Main modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* Modal content */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Product
                </h3>
                <button
                  onClick={() => {
                    closeModal();
                    setStep(1);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form onSubmit={handleSubmit}> {renderForm()}</form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
