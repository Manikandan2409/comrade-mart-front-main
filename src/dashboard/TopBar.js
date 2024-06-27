import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import adminLogo from '../assets/admin.png';

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("do you like to logout")
    navigate('/');
  };
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Admin Logo */}
          <div className="flex-shrink-0">
            <img className="h-8" src={adminLogo} alt="Admin Logo" />
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              {/* Add more navigation links as needed */}
            </div>
          </div>

          {/* Logout Button */}
          <div className="ml-4 flex items-center sm:ml-6">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              onClick={handleLogout} 
            >
              Logout
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
