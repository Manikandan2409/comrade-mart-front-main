import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFacebookF, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-gray-800 p-6 ">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col space-y-4">
          <Link to="/" className="hover:text-gray-300 text-white">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
          <Link to="/order-details" className="text-white hover:text-gray-300">Order Details</Link>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="text-white text-lg font-semibold">Follow Us</div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaFacebookF /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaInstagramSquare /></a>
            <a href="https://www.threads.net" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaTwitterSquare /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaTwitter /></a>
          </div>
          <a href="https://maps.app.goo.gl/YFroguaoPKJ2n5K78" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 flex items-center space-x-2">
            <FaMapMarkerAlt />
            <span>Our Location</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
