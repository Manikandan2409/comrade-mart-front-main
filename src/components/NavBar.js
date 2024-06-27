
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const maxItemCount = 99;

  useEffect(() => {
    const fetchCartItemCount = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/cart/count', {
            method: 'GET',
            headers: {
              Authorization: token,
            },
          });
          if (response.ok) {
            const data = await response.json();
           // alert(data)
            setCartItemCount(data);
          } else {
            console.error('Failed to fetch cart item count');
          }
        } catch (error) {
          console.error('Error fetching cart item count:', error);
        }
      }
    };

    fetchCartItemCount();
  }, [authState]);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCartClick = () => {
    window.alert(`Items in cart: ${cartItemCount}`);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-white text-lg font-semibold  ml-7">Balaji Super Mart</div>
        <div className="block lg:hidden">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        <div className={`w-full block  float-right mr-3 lg:flex lg:items-center lg:w-auto lg:ml-auto ${isOpen ? '' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
            <Link to="/" className="block  mt-4 lg:inline-block lg:mt-0 text-white hover:text-amber-300 active:text-amber-300 active:text-blue-500 mr-4">
              Home
            </Link>
            <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-amber-300 active:text-amber-300 active:text-blue-500 mr-4">
              About
            </Link>
            <Link to="/products" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-amber-300 active:text-amber-300 mr-4">
              Products
            </Link>
            {authState.username ? (
              <>
                <Link to="/order-details" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 active:text-blue-500 mr-4">
                  Order Details
                </Link>
                <span className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4">Welcome, <span className='text-amber-400'>{authState.username}</span></span>
                <button onClick={handleLogout} className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 active:text-blue-500">
                  Logout
                </button>
                {/* <Link to="/cart" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 active:text-blue-500 ml-4 relative" onClick={handleCartClick}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs absolute -top-1 -right-1">
                      {cartItemCount > maxItemCount ? `${maxItemCount}+` : cartItemCount}
                    </span>
                  )}
                </Link> */}
                <Link to="/cart" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 active:text-blue-500 ml-4 relative">
                  <FontAwesomeIcon icon={faShoppingCart}  />
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 rounded-full px-2 py-1 text-white text-xs absolute -top-1 -right-1">
                      {cartItemCount > maxItemCount ? `${maxItemCount}+` : cartItemCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 active:text-blue-500">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
