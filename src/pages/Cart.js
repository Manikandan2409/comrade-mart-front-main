// import React, { useState } from 'react';
// import ProductDetailPanel from './ProductDetailPanel'; // Adjust the import according to your file structure

// const ProductCard = ({ id, image, name, rating, price, oldPrice, offer, description, viewLink }) => {
//   const [isPanelOpen, setIsPanelOpen] = useState(false);
//   const [productDetails, setProductDetails] = useState(null); // State to hold fetched product details

//   const base64ToUrl = (base64String) => `data:image/jpeg;base64,${base64String}`;

//   const renderStars = () => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 !== 0;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
//     }

//     if (halfStar) {
//       stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-500"></i>);
//     }

//     return stars;
//   };

//   const handleViewClick = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/login';
//     } else {
//       try {
//         const response = await fetch(`http://localhost:8080/cart/items/${id}`, {
//           method: 'GET',
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json'
//           },
//         });
//         if (response.ok) {
//           const productData = await response.json();
//           setProductDetails(productData); // Update state with fetched product details
//           setIsPanelOpen(true); // Open the product detail panel
//         } else {
//           console.error('Failed to fetch product details');
//         }
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
//         <img src={base64ToUrl(image)} alt={name} className="w-full h-48 object-cover" />
//         <div className="p-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold">{name}</h3>
//             <button onClick={handleViewClick} className="text-blue-500 hover:underline">
//               VIEW <i className="fa-solid fa-angles-right"></i>
//             </button>
//           </div>
//           <div className="stars flex">
//             {renderStars()}
//           </div>
//           <p className="text-gray-600 mt-2">{description}</p>
//           <div className="flex justify-between items-center mt-4">
//             <div className="text-red-500">Offer: {offer} %</div>
//             <div>
//               <span className="text-gray-500 line-through mr-2">{oldPrice}</span>
//               <span className="text-green-500 font-bold">{price}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isPanelOpen && <ProductDetailPanel product={productDetails} onClose={() => setIsPanelOpen(false)} />}
//     </>
//   );
// };

// export default ProductCard;


// import React, { useEffect, useState } from 'react';

// import ProductCard from '../components/ProductCard'; // Adjust the import according to your file structure
// import { jwtDecode } from 'jwt-decode';

// const Cart = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//         const token = localStorage.getItem('token');
//         const {id}= jwtDecode('token')
//       try {
//         const response = await fetch(`http://localhost:8080/cart/items/${id}`, {
//                       method: 'GET',
//                       headers: {
//                         Authorization: token,
//                         'Content-Type': 'application/json'
//                       },
//                     });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         //console.log(data)
//         setProducts(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;


//   return (
//     <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map(product => (
//         <ProductCard
//           key={product.id}
//           id={product.id}
//           image={product.imageBase64}
//           name={product.name}
//           rating={product.rating || 0} // Assuming rating is available in your product object
//           price={product.afterOfferPrice}
//           oldPrice={product.beforeOfferPrice}
//           offer={product.offer}
//           description={product.description}
//           viewLink={`/product/${product.id}`} // Assuming you have a route to view individual products
//         />
//       ))}
//     </div>
//   );
// };
// export default Cart
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/user/ProductCard'; // Adjust the import according to your file structure
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        // Decode the token to get user information (if needed)
        // const decodedToken = jwtDecode(token);

        const response = await fetch(`http://localhost:8080/cart/items`, {
          method: 'GET',
          headers: {
            Authorization: `${token}`, // Correctly format the Authorization header
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data); // Assuming data is an array of products
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
    <Navbar/>
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
      <Footer/>
   </>  );
};

export default Cart;
