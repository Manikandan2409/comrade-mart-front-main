import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ selectedNavItem, setSelectedNavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductSublistOpen, setIsProductSublistOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
    setIsOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white w-64">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <span className="text-xl font-semibold">Dashboard</span>
        {/* Hamburger button */}
        <button
          onClick={toggleSidebar}
          className="block lg:hidden text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 14H5v-2h14v2zm0-5H5V7h14v2zm0-5H5V2h14v2z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Links */}
      <div className={`flex-grow ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <nav className="text-sm">
          <button
            onClick={() => handleNavItemClick('user')}
            className={`block   text-left justify-start w-full  py-2 px-4 text-white hover:bg-gray-700 ${selectedNavItem === 'user' ? 'bg-gray-700' : ''}`}
          >
            User
          </button>
          {/* Product Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProductSublistOpen(!isProductSublistOpen)}
              className={`flex items-center w-full justify-between w-full py-2 px-4 text-white hover:bg-gray-700 ${selectedNavItem.startsWith('product') ? 'bg-gray-700' : ''}`}
            >
              Product
              <svg
                className={`h-5 w-5 ml-2 ${isProductSublistOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            <div className={`pl-8 ${isProductSublistOpen ? 'block' : 'hidden'}`}>
              <button
                onClick={() => handleNavItemClick('product-view')}
                className={`block py-2 px-4 w-full text-left text-white hover:bg-gray-600 ${selectedNavItem === 'product-view' ? 'bg-gray-600' : ''}`}
              >
                View Products
              </button>
              <button
                onClick={() => handleNavItemClick('product-add')}
                className={`block py-2 px-4 w-full text-left text-white hover:bg-gray-600 ${selectedNavItem === 'product-add' ? 'bg-gray-600' : ''}`}
              >
                Add Products
              </button>
            </div>
          </div>
          {/* Order */}
          <button
            onClick={() => handleNavItemClick('order')}
            className={`block py-2 px-4 w-full text-left text-white hover:bg-gray-700 ${selectedNavItem === 'order' ? 'bg-gray-700' : ''}`}
          >
            Order
          </button>
          {/* Feedback */}
          <button
            onClick={() => handleNavItemClick('feedback')}
            className={`block py-2 w-full px-4 text-left text-white hover:bg-gray-700 ${selectedNavItem === 'feedback' ? 'bg-gray-700' : ''}`}
          >
            Feedback
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
