import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    offer: 20,
    beforeOfferPrice: 100,
    afterOfferPrice: 80,
    quantity: 20,
    type: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === 'file' ? files[0] : value;

    // Update the formData state
    setFormData({ ...formData, [name]: val });

    // Calculate afterOfferPrice based on offer percentage and beforeOfferPrice
    if (name === 'offer' || name === 'beforeOfferPrice') {
      const offer = parseFloat(formData.offer);
      const beforeOfferPrice = parseFloat(formData.beforeOfferPrice);
      const afterOfferPrice = beforeOfferPrice - (beforeOfferPrice * (offer / 100));
      setFormData({ ...formData, afterOfferPrice: afterOfferPrice.toFixed(2) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert(formData.image)
       const payload={
        name:formData.name,
        description:formData.description,
        offer:formData.offer,
        beforeOfferPrice:formData.beforeOfferPrice,
        afterOfferPrice:formData.afterOfferPrice,
        quantity:formData.quantity,
        type:"stationery",
        image:formData.image
      }
      console.log(payload); // Check if FormData is correctly formed

      const response = await axios.post('http://localhost:8080/products/createProduct', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      alert("Product inserted successfully")
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Product</h2>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Type:</label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Offer (%):</label>
              <input type="number" name="offer" value={formData.offer} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Before Offer Price:</label>
              <input type="number" name="beforeOfferPrice" value={formData.beforeOfferPrice} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">After Offer Price:</label>
              <input type="number" name="afterOfferPrice" value={formData.afterOfferPrice} readOnly className="w-full px-3 py-2 border rounded-lg bg-gray-200" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity:</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image:</label>
              <input type="file" name="image" onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
// import React, { useState } from 'react';
// import axios from 'axios'; // Import Axios for making HTTP requests

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     offer: 20,
//     beforeOfferPrice: 100,
//     afterOfferPrice: 80,
//     quantity: 20,
//     type: 'stationery',
//     image: null
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     const val = type === 'file' ? files[0] : value;
//     setFormData({ ...formData, [name]: val });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload={
//         name:formData.name,
//         description:formData.description,
//         offer:formData.offer,
//         beforeOfferPrice:formData.beforeOfferPrice,
//         afterOfferPrice:formData.afterOfferPrice,
//         quantity:20,
//         type:"stationery",
//         image:formData.image


//       }
      
//       console.log(payload)
//        alert(payload)

//       const response = await axios.post('http://localhost:8080/products/createProduct', payload, {
//         headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//       });
//       console.log('Response:', response.data);
//       // Handle success
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} encType='multipart/form-data' method='post'>
//       <label>
//         Name:
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Description:
//         <input type="text" name="description" value={formData.description} onChange={handleChange} />
//       </label>
//       <br />
//       {/* Add more input fields for other properties */}
//       <label>
//         Image:
//         <input type="file" name="image" onChange={handleChange} />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ProductForm;
