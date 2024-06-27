
import React, { useState } from 'react';
import ProductDetailPanel from './ProductDetailPanel'; 

const ProductCard = ({ id, image, name, rating, price, oldPrice, offer, description }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const product = { id, image, name, rating, price, oldPrice, offer, description };

  const base64ToUrl = (base64String) => `data:image/jpegx;base64,${base64String}`;

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
    }

    if (halfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-500"></i>);
    }

    return stars;
  };

  const handleViewClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      setIsPanelOpen(true);
    }
  };

  return (
    <>
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden ">
        <img src={base64ToUrl(image)} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <button onClick={handleViewClick} className="text-blue-500 hover:underline">
              VIEW <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div className="stars flex">
            {renderStars()}
          </div>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="text-red-500">Offer: {offer} %</div>
            <div>
              <span className="text-gray-500 line-through mr-2"> &#8377;{oldPrice}</span>
              <span className="text-green-500 font-bold">&#8377;{price}</span>
            </div>
          </div>
        </div>
      </div>
      {isPanelOpen && <ProductDetailPanel product={product} onClose={() => setIsPanelOpen(false)} />}
    </>
  );
};

export default ProductCard;
