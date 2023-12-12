"use client";
import React, { useState } from "react";
import Navbar from "../components/nav";
import Cart from "../components/cart";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import bg from "../img/aboutBP.jpg";

const About = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };
  return (
    <div className="flex flex-col w-full h-full  md:overflow-hidden bg-[#170D18]">
      <Navbar openCart={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      <div className="relative`">
        <Image src={bg} className="w-full md:h-96 h-32 opacity-70" alt="image" />

        <div className="relative w-full md:-mt-96 -mt-32 h-32 md:h-96 bg-opacity-70 bg-[#170D18] text-center text-white">
          <div className="md:text-8xl text-3xl p-4 md:pt-32  h-full rounded">
            WELCOME TO <br /> THE BD ARTS
          </div>
        </div>

        <div className="text-white w-4/5 m-auto flex flex-col justify-center items-center">
          <div className="md:text-5xl text-3xl m-4">OUR PALETTE OF PURPOSE</div>
          <div className="flex m-3">
            AT The BD ARTS, WERE EACH PIXLE RECOUTS A STORY AND IMAGINATION HAS
            NO LIMITS. OUR COMPUTERIZED MATERIAL IS SOMETHING BEYOND A SPACE
            --IT'S AN ENERGETIC RANGE OF DIRECTION, A DOWMAIN WERE DEVLOPMENT
            AND CREATIVE MIND JOIN IN AN ENSEMBLE OF VARIETIES, SHAPES, AMD
            THROUGHTS.
          </div>
          <div className="uppercase m-3">
            allow your imagination to take off as you investigate the bd art's,
            team of definitive begetter who can transfrom your dreams and show
            some life, and the advanced range is your order.
          </div>
          <div className="uppercase m-8 text-3xl md:text-5xl">
            why immers yourself in the bd ARTS
          </div>
          <div className="uppercase">
            different exhibit: investigate an assorted display of work of art
            crossing different kinds, styles, and mediums. from conventional
            artworks to fine and advanced manifestations, we command the
            kaleidoscope of creative articulation
          </div>
          <div className="uppercase m-3">
            inventive apparatuses: enabling ingenuity is at the center of our
            way of our way of thinking. the bd arts gives state of the art
            exemplifications and assets to assist specialists with rejuvenation
            their drams.
          </div>

          <div>
            <div className="uppercase text-3xl md:-5xl m-2">reviews us:</div>
            <div className="w-4/5 mb-4">
              <input
                type="text"
                className="w-full h-1/4  border-purple-950 rounded p-4"
                placeholder='"WE WOULD APPERCIATE YOUR REVIEW SO THAT WE  CAN LEAN ABOUT YOUR EXPERIENCE."'
              />
            </div>
          </div>
        </div>

        {/* <div className="w-screen mb-10 text-white flex flex-col"> */}
          <div className="relative w-full text-white">
            <Image src={bg} className="w-full h-96" alt="image" />
            <div className="relative -mt-96 bg-[#170D18] bg-opacity-50 h-full w-full">
              <div class="uppercase flex flex-col justify-center items-center p-4">
                <div className="md:text-5xl text-3xl m-4">connect with us</div>
                <div>
                  have QUESTIONS, ideas, or simply need to share your most
                  recent show-stopper?
                </div>
                <div className="flex text-5xl m-2 justify-center items-center">
                  <a href="https://www.facebook.com/profile.php?id=61553322849566" className="m-1">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/brandwavedigital.official/" className="m-1">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/company/brand-wave-digital/" className="m-1">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="m-1">
                    <FaXTwitter />
                  </a>
                </div>
                <div>
                  much obliged to you for picking the bd arts as your creative
                  safe-haven.
                </div>
                <div>we shout paint a dunamic funture together!</div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
