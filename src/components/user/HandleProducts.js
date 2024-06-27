
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Adjust the import according to your file structure

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/getProducts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
  <div className=' h-20 bg-sky-50'>
  <h5 className=' text-2xl  font-semibold  justify-center   text- text-center ' > Products</h5>
  </div>
    <div className="product-list mt-9 mb-9 ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.imageBase64}
          name={product.name}
          rating={product.rating || 0} // Assuming rating is available in your product object
          price={product.afterOfferPrice}
          oldPrice={product.beforeOfferPrice}
          offer={product.offer}
          description={product.description}
          viewLink={`/product/${product.id}`} // Assuming you have a route to view individual products
        />
      ))}
    </div>
    </>
  );
};

export default ProductList;
