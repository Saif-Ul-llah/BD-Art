'use client'
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/nav';
import Image from 'next/image';
import bg from '@/app/img/categories.jpg';


const CustomCarousel = () => {
  return (
<div className=''>
      <div>
       <Image src={bg} className='w-screen absolute -z-10  h-screen'  alt='image'/>
     </div>
      <Navbar/>
  <div className='md:flex md:flex-col md:mx-auto md:justify-center md:items-center mt-36 '>
     <div className=' md:w-9/12 '>
    <div className="carousel-container   ">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        centerMode={true}
        autoPlay={true}
        centerSlidePercentage={60} 
        
      >
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 1"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 2"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 1"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 2"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 1"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 2"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 1"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 2"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 1"
          />
        </div>
        <div className="carousel-item mx-5">
          <img
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Image 2"
          />
        </div>
        
        {/* Add more slides as needed */}
      </Carousel>
    </div>
    </div>
    </div>
</div>  );
};

export default CustomCarousel;

