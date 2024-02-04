"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/nav";
import Image from "next/image";
import bg from "../../app/img/categories.jpg";
import Cart from "../components/cart";
import axios from "../../../utilis/axios";
import MineLoader from "../components/mineloader";
import Spinner from "../components/spinner";
import { useRouter } from "next/navigation";

const CustomCarousel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/get-products");
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    router.push(`/Products/${productId}`);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      const nextSlide = (currentSlide + 1) % products.length;
      setCurrentSlide(nextSlide);
    } else if (e.key === "ArrowLeft") {
      const prevSlide = (currentSlide - 1 + products.length) % products.length;
      setCurrentSlide(prevSlide);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, products.length]);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };
  return (
    <div className="">
      <div>
        <Image
          src={bg}
          className="w-screen absolute -z-10 h-screen"
          alt="image"
        />
      </div>
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />

      <div className="md:flex md:flex-col md:mx-auto md:justify-center md:items-center mt-36 md:mt-12">
        <div className="md:w-9/12">
          <div className="carousel-container cursor-pointer">
            {!loading && (
              <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                centerMode={true}
                autoPlay={true}
                centerSlidePercentage={60}
                onChange={handleSlideChange}
                selectedItem={currentSlide}
              >
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="carousel-item mx-5"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className="image-container">
                      <img
                        className={`md:h-96 h-48  ${
                          index === currentSlide
                            ? "center-image"
                            : index < currentSlide
                            ? "small-left-image"
                            : "small-right-image"
                        }`}
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    </div>
                    <figcaption className="flex pt-5 px-4 md:text-4xl font-bold justify-center items-center">
                      <p className="w-64 border-2 border-white rounded-3xl text-white">{product.category}</p>
                    </figcaption>
                    <div className="h-9"></div>
                  </div>
                ))}
              </Carousel>
            )}
            {loading && <Spinner />}
          </div>
        </div>
      </div>

      <style jsx>{`
        .image-container {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease-in-out;
        }

        .center-image {
          transform: scale(1.1);
        }

        .small-left-image {
          transform: scale(0.6);
        }

        .small-right-image {
          transform: scale(0.6);
        }

        .image-container:hover .small-left-image,
        .image-container:hover .small-right-image {
          transform: scale(1);
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default CustomCarousel;
