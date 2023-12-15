"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "../../../../utilis/axios";
import Axios from "axios";
import Cart from "src/app/components/cart";
import { useRouter } from "next/navigation";
import Spinner from "src/app/components/spinner";
import Navbar from "src/app/components/nav";
import bg from "../../img/cartBg.jpg";
import Image from "next/image";
const Product = (params) => {
  const router = useRouter();
  const isMounted = useRef(true);

  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const productId = params.params.id;
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [Executed, setExecuted] = useState({
    Background: false,
    animation: false,
    Character_Proportion: false,
    Rigging: false,
    Overlay_Type: false,
    Character_Proportion: false,
    Emote: false,
  });
  // const[ifPrice,setIfPrice]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-product/${productId}`);
        const data = response.data;
        if (isMounted.current) {
          setProductDetail(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      // Component will unmount
      isMounted.current = false;
    };
  }, [productId]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    setUserId(userData);
  }, []);
  const IfPrice = (name, value) => {
    if (name === "Background" && value === "Yes" && !Executed.Background) {
      // Update the price in the productDetail object
      setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      setExecuted({ ...Executed, Background: true });
    } else if (name === "Background" && value === "No" && Executed.Background) {
      setProductDetail({ ...productDetail, price: productDetail.price - 200 });
      // setConditionExecuted(false);
      setExecuted({ ...Executed, Background: false });
    }
    if (name === "animation" && value === "Yes" && !Executed.animation) {
      // Update the price in the productDetail object
      setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      setExecuted({ ...Executed, animation: true });
    } else if (name === "animation" && value === "No" && Executed.animation) {
      setProductDetail({ ...productDetail, price: productDetail.price - 200 });
      // setConditionExecuted(false);

      setExecuted({ ...Executed, animation: false });
    }
    if (name === "Rigging" && value === "Yes" && !Executed.Rigging) {
      // Update the price in the productDetail object
      setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      setExecuted({ ...Executed, Rigging: true });
    } else if (name === "Rigging" && value === "No" && Executed.Rigging) {
      setProductDetail({ ...productDetail, price: productDetail.price - 200 });
      // setConditionExecuted(false);
      setExecuted({ ...Executed, Rigging: false });
    }
    if (name === "Overlay_Type" && !Executed.Overlay_Type) {
      if(value==="Cam_Overlay"){
        setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      }else if(value==="Chat_Overlay"){
        setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      }
      else if(value==="Full_Stream_Package"){
        setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      } else if(value==="Stream_Overlay"){
        setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      }else if(value==="Stream_Screens"){
        setProductDetail({ ...productDetail, price: productDetail.price + 200 });
      }


      setExecuted({ ...Executed, Overlay_Type: true });
    } 
    if (name === "Character_Proportion" && !Executed.Character_Proportion) {
      if (value == "Half_Body") {
        setProductDetail({
          ...productDetail,
          price: productDetail.price + 200,
        });
      } else if (value == "Full_Body") {
        setProductDetail({
          ...productDetail,
          price: productDetail.price + 200,
        });
      } else if (value == "Headshot") {
        setProductDetail({
          ...productDetail,
          price: productDetail.price + 200,
        });
      }
      setExecuted({ ...Executed, Character_Proportion: true });
    }
    if (name === "Emote" && !Executed.Emote) {
      if (value == "Anime") {
        setProductDetail({
          ...productDetail,
          price: productDetail.price + 200,
        });
      } else if (value == "Chibbi") {
        setProductDetail({
          ...productDetail,
          price: productDetail.price + 200,
        });
      }
      setExecuted({ ...Executed, Emote: true });
    }
  };
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    IfPrice(name, value),
      setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (e) => {
    try {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      if (isMounted.current && router) {
        router.push("/signIn");
      }
    } else {
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", selectedFile);
      cloudinaryData.append("upload_preset", "userCart");
      cloudinaryData.append("cloud_name", "saif-ul-llah");

      try {
        setLoading(true);
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/saif-ul-llah/image/upload",
          cloudinaryData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const formData = {
          productId: productDetail,
          userId: userId,
          selectedOptions,
          description,
          img: response?.data?.url,
        };

        const cartResponse = await axios.post("/update-cart", formData);

        if (cartResponse.data.message) {
          router.push("/home");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-screen md:h-screen  md:overflow-hidden" >
      <div>
        <Image src={bg} className="w-full absolute -z-10  h-full" alt="image" />
      </div>
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      {loading ? (
        <div className="mt-32">
          <Spinner />
        </div>
      ) : (
        <div className="">
        {/*  Name */}
          <div className="flex border-4 w-1/2 rounded-2xl bg-white bg-opacity-20 border-white mx-auto md:h-44 h-24">
            <div className="md:text-8xl text-2xl m-auto text-white p-2 ">
              {productDetail.name}
            </div>
          </div>
        {/* Price */}
          <div className="text-center w-full text-white my-4 text-5xl mb-10 md:mb-0 ">
            Price $ {productDetail.price}{" "}
          </div>
          
          <div className="flex  w-full  md:-mt-3">
            <div className="md:flex md:w-full justify-center items-center">        
        {/* Animation */}
                <div className="-mt-10">
                  {productDetail.animation && (
                    <div className="md:w-1/3 mx-6">
                      <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-36 text-center text-white md:text-3xl">
                        Animation:
                      </div>
                      <div className=" w-full mx-auto text-white">
                        {Object.entries(productDetail.animation).map(
                          ([key, value]) =>
                            value ? (
                              <div key={key} className="flex">
                                <input
                                  type="radio"
                                  value={value}
                                  name="animation"
                                  className="m-3"
                                  onChange={handleOptionChange}
                                />
                                <div className="m-3">{value}</div>
                              </div>
                            ) : null
                        )}
                      </div>
                    </div>
                  )}
                </div>
        {/* Background */}
              <div>
                {productDetail.Background && (
                  <div className="md:w-1/3 mx-6">
                    <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-36 text-center text-white md:text-3xl">
                      Background:
                    </div>
                    <div className="w-full mx-auto text-white">
                      {Object.entries(productDetail.Background).map(
                        ([key, value]) =>
                          value ? (
                            <div key={key} className="flex">
                              <input
                                type="radio"
                                value={key}
                                name="Background"
                                className="m-3"
                                onChange={handleOptionChange}
                              />
                              <div className="m-3">{value}</div>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}
              </div>
       {/* Character_Proportion */}
              <div>
                {productDetail.Character_Proportion && (
                  <div className="md:w-1/3 mx-6 ">
                    <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-64 text-center text-white md:text-3xl">
                      Character_Proportion:
                    </div>
                    <div className="w-full mx-auto text-white">
                      {Object.entries(productDetail.Character_Proportion).map(
                        ([key, value]) =>
                          value ? (
                            <div key={key} className="flex">
                              <input
                                type="radio"
                                value={key}
                                name="Character_Proportion"
                                className="m-3"
                                onChange={handleOptionChange}
                              />
                              <div className="m-3">{value}</div>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}
              </div>
        {/* Rigging */}
              <div>
                {productDetail.Rigging && (
                  <div className="md:w-1/3 mx-6">
                    <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-64 text-center text-white md:text-3xl">
                      Rigging:
                    </div>
                    <div className="w-full mx-auto text-white">
                      {Object.entries(productDetail.Rigging).map(
                        ([key, value]) =>
                          value ? (
                            <div key={key} className="flex">
                              <input
                                type="radio"
                                value={key}
                                name="Rigging"
                                className="m-3"
                                onChange={handleOptionChange}
                              />
                              <div className="m-3">{value}</div>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}
              </div>
        {/* Overlay_Type */}
              <div>
                {productDetail.Overlay_Type && (
                  <div className="md:w-1/3 mx-6 ">
                    <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-64 text-center text-white md:text-3xl">
                      Overlay_Type:
                    </div>
                    <div className="w-full mx-auto text-white">
                      {Object.entries(productDetail.Overlay_Type).map(
                        ([key, value]) =>
                          value ? (
                            <div key={key} className="flex">
                              <input
                                type="radio"
                                value={key}
                                name="Overlay_Type"
                                className="m-3"
                                onChange={handleOptionChange}
                              />
                              <div className="m-3">{value}</div>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}
              </div>
        {/* Add Description and refence image */}
              <div>
                <div className="mx-6">
                  <div>
                    <div className="border-2 border-white rounded-lg bg-opacity-30 p-1 md:w-64 text-center text-white md:text-3xl">
                      Add Description
                    </div>
                    <textarea
                      className="md:w-64 w-full text-xl mx-auto  border-2 border-white rounded-lg bg-opacity-30 m-4"
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="border-2 border-white rounded-lg  w-full md:w-64 text-white">
                    <div className="border-2 border-white rounded-lg p-1  text-center text-white md:text-3xl">
                      Reference Image
                    </div>
                    <input
                      type="file"
                      name="img"
                      className="file:w-64 file:bg-white"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center text-[#4b214c] font-bold text-3xl">
            <button
              type="submit"
              className="mx-auto md:w-52 p-3 mt-2 rounded-md bg-white"
              onClick={handleAddToCart}
            >
              Add-To-Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
