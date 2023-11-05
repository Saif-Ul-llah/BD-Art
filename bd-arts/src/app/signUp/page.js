"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../utilis/axios"; // Make sure you have axios installed
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the desired icons
import bg from "@/app/img/bg.jpg"; 
import Link from "next/link";


const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async () => {
    // Reset errors
    setErrors({});

    // Validation
    const validationErrors = {};

    if (!formData.userName.trim()) {
      validationErrors.userName = "User Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      // Validation errors found, update the state
      setErrors(validationErrors);
      return; // Exit early if there are validation errors
    }

    // If no validation errors, proceed with signup
    const bodyformData = new FormData();
    bodyformData.append("userName", formData.userName);
    bodyformData.append("userEmail", formData.email);
    bodyformData.append("userPass", formData.password);

    try {
      const response = await axios.post("/registration",bodyformData,{
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      const success = response.data.success;
      if (success === true || response.data.email) {
        router.push("/signIn");
        alert("Registered successFully")
      } else {
        // Registration failed
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error(`${error.response.status} \n${error.response.data}`);
      }
    }
  };

  return (
    <div>
       <div>
            <Image
              src={bg}
              className="w-full absolute -z-10  h-screen"
              alt="image"
            />
          </div>

      <div className="">
        <div className="flex flex-col opacity-80  items-center justify-center py-36 px-6 md:py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-transparent border-2 border-white text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Create new account !
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                    placeholder="John"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-600" />
                      ) : (
                        <FaEye className="text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  {/* ... */}
                  <div>
                    <label
                      htmlFor="cpassword"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        id="cpassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-gray-600" />
                        ) : (
                          <FaEye className="text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* ... */}
                </div>

                {/* <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                </div> */}
                <button
                  type="submit"
                  onClick={handleSignUp}
                  className="w-full text-white bg-blue-900 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-bold text-black ">
                  Already have an account .{" "}
                  <Link
                    href="/signIn"
                    className="font-medium text-blue-900 hover:underline "
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
