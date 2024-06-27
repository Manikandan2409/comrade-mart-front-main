import React from 'react';
import Aboutus from '../assets/aboutus.jpeg';
import Navbar from './NavBar';
import Footer from './Footer';
const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
   
      <h2 className="text-3xl font-bold mb-6 text-center">
        About <span className="text-gray-500">Us</span>
      </h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <img src={Aboutus} alt="About Us" className="border-dotted border-4 border-gray-400 p-4 relative " />
            {/* <div className="absolute inset-0 border-dotted border-4 border-gray-400 animate-rolling"></div> */}
          </div>
        </div>
        <div className="flex-1 flex border-line border-4 border-gray-2\2 justify-center  items-center ">
          <p className="max-w-md ">
            Welcome to Marvel Components, your ultimate destination for all your hardware needs. Established with a vision to provide top-quality products and exceptional customer service, we have been serving the community with dedication and passion. Our store offers a wide range of components, from the latest processors to high-performance graphics cards, ensuring that every enthusiast and professional finds what they need. At Marvel Components, we believe in the power of technology to transform lives, and we are committed to helping you build, upgrade, and optimize your systems with the best products available. Whether you are a gamer, a designer, or a tech enthusiast, our knowledgeable staff is here to guide you through every step of your journey. Join us and experience the Marvel difference today!
          </p>
        </div>
      </div>
     
    </div>
  );
};

export default AboutUs;
