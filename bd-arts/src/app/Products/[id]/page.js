"use client";
import React, { useEffect, useState } from "react";
import axios from "../../../../utilis/axios";
import Axios from "axios";
import Spinner from "@/app/components/loader";
import Navbar from "@/app/components/nav";
import Cart from "@/app/components/cart";
import { useRouter } from "next/navigation";

const Product = (params) => {

  const router =useRouter();

  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const Id = params.params.id;
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(async () => {
    const response = await axios.get(`/get-product/${Id}`);
    let data = response.data;
    setProductDetail(data);
    setLoading(false);
  }, []);

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  // const getdata = (event) => {
  //   const { name, value } = e.target;

  //   if (name === "img" && e.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //     setSelectedFile({ ...formData, [name]: file });
  //   } else {
  //     setDescription(event.target.value);
  //   }
  // };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (e) => {
    // setSelectedFile(event.target.files[0]);
    try {
      const file = e.currentTarget.files[0];
      setSelectedFile(file);
    } catch (error) {
      console.log("getting img error onchange", error);
    }
  };

  const handleAddToCart = async () => {
    let id =JSON.parse(localStorage.getItem("UserData"));
    // console.log(id)
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", selectedFile);
    cloudinaryData.append("upload_preset", "userCart");
    cloudinaryData.append("cloud_name", "saif-ul-llah");

    try {
      const respon = await Axios.post(
        "https://api.cloudinary.com/v1_1/saif-ul-llah/image/upload",
        cloudinaryData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      ).then(async (res) => {

        try {
          const formData = { 
            productId: productDetail,
            userId:id._id,
            selectedOptions,
            description,
            img: res?.data?.url,
          };
         
          const response = await axios.post("/update-cart", formData);
            // console.log(response)
          if (response.data.message) {
            router.replace("/home");
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="flex flex-col w-screen h-screen bg-[#170D18] md:overflow-hidden">
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          {/* Image and Name */}
          <div className="flex bg-white w-1/2 mx-auto md:h-52 h-24">
            <div className="md:text-8xl text-2xl my-auto text-white p-2 bg-[#4b214c]">
              {productDetail.name}
            </div>
            <div className="mx-auto">
              <img
                src={productDetail.imageUrl}
                className=" md:w-46 md:h-52 w-24 h-24"
              />
            </div>
          </div>

          <div className="flex bg-[#170D18] w-full mt-10">
            <div className="md:flex md:w-full justify-center items-center">
             <div>
             <div className="md:w-1/3 mx-6">
              <div className="bg-[#4b214c] p-1 md:w-36 text-center text-white md:text-3xl">
                Price
                </div>
                <div className=" w-full mx-auto text-white m-2 text-center">{productDetail.price} </div>
              </div>
             <div>
                {" "}
                {productDetail.animation && (
                  <div className="md:w-1/3 mx-6">
                    <div className="bg-[#4b214c] p-1 md:w-36 text-center text-white md:text-3xl">
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
             </div>

              <div>
                {productDetail.Background && (
                  <div className="md:w-1/3 mx-6">
                    <div className="bg-[#4b214c] p-1 md:w-36 text-center text-white md:text-3xl">
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

              <div>
                {productDetail.Character_Proportion && (
                  <div className="md:w-1/3 mx-6 ">
                    <div className="bg-[#4b214c] p-1 md:w-64 text-center text-white md:text-3xl">
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

              <div>
                {productDetail.Rigging && (
                  <div className="md:w-1/3 mx-6">
                    <div className="bg-[#4b214c] p-1 md:w-64 text-center text-white md:text-3xl">
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

              <div>
                {productDetail.Overlay_Type && (
                  <div className="md:w-1/3 mx-6 ">
                    <div className="bg-[#4b214c] p-1 md:w-64 text-center text-white md:text-3xl">
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

              <div>
                <div className="mx-6">
                  <div>
                    <div className="bg-[#4b214c] p-1 md:w-64 text-center text-white md:text-3xl">
                      Add Description
                    </div>
                    <textarea
                      className="md:w-64 w-full text-xl mx-auto text-white bg-[#4b214c] border-white border-2 rounded-md m-4"
                      onChange={handleDescriptionChange}
                    />
                  </div>
                  <div className="bg-[#4b214c] w-full md:w-64 text-white">
                    <div className="bg-[#4b214c] p-1 md:w-64 text-center text-white md:text-3xl">
                      Reference Image
                    </div>
                    <input
                      type="file"
                      name="img"
                      className=""
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center bg-[#170D18] text-[#4b214c] font-bold text-3xl">
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
