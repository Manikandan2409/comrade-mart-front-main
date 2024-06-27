import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import AboutUs from '../components/About';
import PlaceOrder from '../assets/placeorder.jpeg';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

export const About = () => {
  const [isInView, setIsInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const offset = 200; // Adjust this value based on your requirement
      if (position > offset) {
        setIsInView(true);
        controls.start('visible');
      } else {
        setIsInView(false);
        controls.start('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <div>
         <Navbar/>
      <AboutUs />
      <div className="container mx-auto p-4 bg-slate-400">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our <span className="text-red-500">Specialities</span>
        </h2>
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="flex-1">
            <div className="relative">
              <p className="max-w-md ml-10">
                Place Your Order Everywhere and Get Delivery Everywhere
                Imagine a world where your favorite products are just a click away, no matter where you are. With our revolutionary service, you can place your order everywhere and get it delivered everywhere. Here's why you’ll love it:
                Ultimate Convenience: Whether you're at home, in the office, or on vacation, our platform allows you to order with ease from anywhere you have internet access.
                Global Reach: From bustling cities to remote countryside, our delivery network ensures you receive your items no matter where you are.
                Seamless Experience: Our user-friendly interface makes ordering quick and simple, so you can focus on enjoying your purchase rather than worrying about logistics.
                Unmatched Reliability: Count on us to deliver your products promptly and in perfect condition, every single time.
                Experience the freedom of limitless shopping. Place your order everywhere and get it delivered everywhere. Start shopping today and let us bring the world to your doorstep!
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <motion.img
              src={PlaceOrder}
              alt="Place order Everywhere"
              className="border-dotted border-4 border-gray-400 p-4"
              initial="hidden"
              animate={controls}
              variants={containerVariants}
            />
          </div>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
