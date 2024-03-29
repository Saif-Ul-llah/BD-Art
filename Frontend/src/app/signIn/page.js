"use client";

import Image from "next/image";
import bg from "../../app/img/bg.jpg"; //
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import axios from "../../../utilis/axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then( async(session) => {
      // signIn('google');
    if (session) {
      const userInfo = {
        email: session.user.email,
        user_name: session.user.name,
      };

      try {
        // Call the backend API to add the user to MongoDB
      const response =  await axios.post("/addGoogleUser", userInfo);

        localStorage.setItem("UserData", JSON.stringify(response.data)),
        console.log("User data stored in localStorage:", response.data);
        // Redirect the user to the home page
        router.push("/home");
      } catch (error) {
        console.log(`Error adding Google user: ${error.message}`);
        // Handle error appropriately (e.g., show an error message)
      }
    } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      let bodyformData = new FormData();
      bodyformData.append("userEmail", formData.email);
      bodyformData.append("password", formData.password);

      axios({
        method: "post",
        url: "/signin",
        data: bodyformData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response);
          let success = response.data.success;

          if (success == true || response.data.email) {
            localStorage.setItem("UserData", JSON.stringify(response.data));
            router.push("/home");
          } else {
            alert(response.data.message);
          }
        })

        .catch(function (error) {
          if (error.response) {
            console.log(`${error.response.status} \n${error.response.data}`);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    signIn('google');
  }
    return (
      <div>
        <div>
          <div>
            <Image
              src={bg}
              className="w-full absolute -z-10  h-screen"
              alt="image"
            />
          </div>
          <div>
            <div className="flex flex-col opacity-80  items-center justify-center px-6 md:py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-transparent border-2 border-white text-white rounded-lg shadow dark:border mt-8 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
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
                        className="block mb-2 text-sm font-medium  dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={handleSignIn}
                      className="w-full text-white bg-blue-900 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Sign in
                    </button>
                    <div
                      className="w-full flex font-medium rounded-lg cursor-pointer bg-gray-700 text-sm px-5 py-2.5 text-center"
                      onClick={handleGoogleLogin}
                    >
                      <FcGoogle className="w-5 h-5 mr-16 ml-4" /> Continue
                      With Google
                    </div>
                    <p className="text-sm font-bold text-white dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link
                        href="/signUp"
                        className="font-extrabold text-2xl text-red-900 bg-gray-50 rounded-md underline hover:underline dark:text-blue-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  // }
};

export default Login;
