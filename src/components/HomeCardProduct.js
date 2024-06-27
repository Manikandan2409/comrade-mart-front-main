import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 transform transition-transform duration-300 hover:scale-105">
      <img src={product.image} alt={product.description} className="mb-2" />
      <p className=" text-center text-slate-900 font-bold ">{product.description}</p>
    </div>
  );
};

export default ProductCard;
