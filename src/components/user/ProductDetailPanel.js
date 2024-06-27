
import React, { useContext } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const ProductDetailPanel = ({ product, onClose }) => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
     navigate('/login')
    } else {
      window.location.href = `/order?product=${product.id}`;
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      try {
        const response = await fetch('http://localhost:8080/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ userId: authState.userId, productId: product.id, quantity: 1 }),
        });

        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }

        alert('Product added to cart');
      } catch (error) {
        console.error(error);
        alert('Error adding product to cart');
      }
    }
  };

  const handleRemoveFromCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      try {
        const response = await fetch('http://localhost:8080/cart/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({ userId: authState.userId, productId: product.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to remove from cart');
        }

        alert('Product removed from cart');
      } catch (error) {
        console.error(error);
        alert('Error removing product from cart');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          style={{ color: '#ff0000', fontSize: '20px' }}
        >
          <i className="fas fa-times"></i>
        </button>
        <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="w-full h-64 object-cover" />
        <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-red-500">Offer: {product.offer} %</div>
          <div>
            <span className="text-gray-500 line-through mr-2">&#8377;{product.oldPrice}</span>
            <span className="text-green-500 font-bold">&#8377;{product.price}</span>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          {/* <button onClick={handleBuyNow} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Buy Now
          </button> */}
        <Link to={`/order/product/${product.id}`}>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Buy Now
          </button>
        </Link>

          <button onClick={handleAddToCart} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Add to Cart
          </button>
          <button onClick={handleRemoveFromCart} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPanel;
