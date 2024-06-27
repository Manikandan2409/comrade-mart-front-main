import React from 'react';
// import { ProductCard } from './CardProduct';
import ProductCard from './HomeCardProduct'; // Import the default export
import product1 from '../assets/householdthings.jpg';
import product2 from '../assets/groceries.jpeg'
import product3 from '../assets/stationery.jpeg'

const OurProducts = () => {
  const products = [
    {
      description: "House-hold Things",
      image: product1
    },
    {
      description: "Groceries",
      image: product2
    },
    {
      description: "Stationeries",
      image: product3
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OurProducts;
