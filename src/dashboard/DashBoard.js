import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import UserDetails from './UserDetails';
import ProductDetails from './ProductDetails';
import ProductView from './ProductView';
import ProductAdd from './ProductForm';
import OrderDetails from './OrderDetails';
import FeedbackDetails from './FeedbackTable';

const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('');

  const renderDetailsPanel = () => {
    switch (selectedNavItem) {
      case 'user':
        return <UserDetails />;
      case 'product-view':
        return <ProductView />;
      case 'product-add':
        return <ProductAdd />;
      case 'order':
        return <OrderDetails />;
      case 'feedback':
        return <FeedbackDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} />
      <div className="flex flex-col flex-1">
        <TopBar />
        <div className="flex-1 p-4 overflow-y-auto">
          {renderDetailsPanel()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
