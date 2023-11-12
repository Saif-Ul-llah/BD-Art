"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/nav";
import Image from "next/image";
import bg from "@/app/img/categories.jpg";
import Cart from "../components/cart";
import axios from "../../../utilis/axios";
import MineLoader from "../components/mineloader";
import Spinner from "../components/spinner";
import { useRouter } from "next/navigation";

const CustomCarousel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // Fetch products from the server (replace 'fetchProducts' with your actual API call)
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/get-products"); // Replace with your API endpoint
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // State to manage the opened/closed state of the cart
  const [cartOpen, setCartOpen] = useState(false);

  // State to store the selected product ID
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Function to handle product click
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    router.push(`/Products/${productId}`);
    // console.log(productId);
    // You can perform additional actions here, such as opening a modal with product details
  };

  // Function to open the cart
  const openCart = () => {
    setCartOpen(true);
  };

  // Function to close the cart
  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <div className="">
      <div>
        <Image
          src={bg}
          className="w-screen absolute -z-10  h-screen"
          alt="image"
        />
      </div>
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />

      <div className="md:flex md:flex-col md:mx-auto md:justify-center md:items-center mt-20 ">
        <div className=" md:w-9/12">
          <div className="carousel-container">
            {!loading && (
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                centerMode={true}
                autoPlay={true}
                centerSlidePercentage={60}
              >
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="carousel-item mx-5"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      className="md:h-96 h-48"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <figcaption className="absolute px-4 md:text-4xl font-bold text-black bottom-6">
                      <p className="">{product.category}</p>
                    </figcaption>
                  </div>
                ))}
              </Carousel>
            )}
            {loading && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
