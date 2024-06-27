
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import Navbar from '../NavBar';

const Order = () => {
  
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [dispatchLocation, setDispatchLocation] = useState({
    username: '',
    phonenumber: '',
    email: '',
    address: '',
    city: '',
    state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [showDetails, setShowDetails] = useState(false);
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  const openRazorpay = (orderID) => {
    if (!orderID) {
        console.error('Order ID is not available.');
        return;
    }

    const options = {
        key: 'rzp_test_lICurc3EfWl0Ml',
        order_id: orderID,
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        image: `data:image/jpeg;base64,${product.imageBase64}`,
        name: 'Comrade Mart',
        description: 'Order Payment',
        handler: (response) => {
            handleRazorResponse(response);
        },
        prefill: {
            name: dispatchLocation.username,
            email: dispatchLocation.email,
            contact: dispatchLocation.phonenumber
        },
        notes: {
            address: dispatchLocation.address
        },
        theme: {
            color: '#3399cc'
        }
    };

    // eslint-disable-next-line no-undef
    const rzpInstance = new Razorpay(options);
    rzpInstance.open();
};

const handleRazorResponse = (response) => {
  const orderData = {
      productId: product.id,
      quantity: quantity,
      price: totalPrice,
      dispatchLocation: dispatchLocation,
      modeOfPayment: paymentMethod,
      username: dispatchLocation.username,
      phoneNumber: dispatchLocation.phonenumber,
      email: dispatchLocation.email,
      address: dispatchLocation.address,
      city: dispatchLocation.city,
      state: dispatchLocation.state,
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      signature: response.razorpay_signature
  };

  placeOrder(orderData);
};



  useEffect(() => {
   
    axios.get(`http://localhost:8080/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        setTotalPrice(productData.afterOfferPrice);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });

   // alert("going to get lcoation value")
    axios.get('http://localhost:8080/user/dispatch-location', {
      headers: {
        Authorisation: `${token}`, 
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const { username, phonenumber, email, address, city, state } = response.data;
       // alert(username)
        setDispatchLocation({
          username: username || '',
          phonenumber: phonenumber || '',
          email: email || '',
          address: address || '',
          city: city || '',
          state: state || ''
        });
      })
      .catch(error => {
        alert(error)
        console.error('Error fetching user dispatch location!', error);
      });
  }, [productId]); 
  const handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
    if (product?.afterOfferPrice) {
      setTotalPrice(selectedQuantity * product.afterOfferPrice);
    }
  };

  const handleNext = () => {
    setShowDetails(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      productId: product.id,
      quantity: quantity,
      price: totalPrice,
      dispatchLocation: dispatchLocation,
      modeOfPayment: paymentMethod,
      username:dispatchLocation.username,
      phoneNumber:dispatchLocation.phonenumber,
      email:dispatchLocation.email,
      address:dispatchLocation.address,
      city:dispatchLocation.city,
      state:dispatchLocation.state

    };

    if (paymentMethod === 'bankTransfer') {
      
      // axios.post('http://localhost:8080/orders/process-payment', {
      //   amount: totalPrice // Assuming totalPrice is the amount to be paid
      // })
      //   .then(response => {
      //     const { paymentId, paymentStatus } = response.data;
      //     orderData.paymentId = paymentId;
      //     orderData.paymentStatus = paymentStatus;

      //     placeOrder(orderData);
      //   })
      //   .catch(error => {
      //     console.error('Error processing bank transfer!', error);
      //   });
      try {
        const token =localStorage.getItem('token');
        const response = await axios.post('http://localhost:8080/orders/create',orderData,
        {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
      });
     // alert(response);
      console.log(response)
      console.log(response)
      console.log(response.data)
        const { id: orderID } = response.data;
        openRazorpay(orderID);
    } catch (error) {
        console.error('Error processing bank transfer!', error);
    }
    } else {
     
      placeOrder(orderData);
    }
  };

  const placeOrder = (orderData) => {
  
    axios.post('http://localhost:8080/orders/place', orderData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert('Order placed successfully!');
      })
      .catch(error => {
        console.error('There was an error placing the order!', error);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-2xl">
          <img src={`data:image/jpeg;base64,${product.imageBase64}`} alt={product.name} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-red-500 font-bold mb-2">Offer: {product.offer}%</p>
            <p className="text-gray-600 line-through">Before Offer: &#8377;{product.beforeOfferPrice}</p>
            <p className="text-green-600">After Offer: &#8377;{product.afterOfferPrice}</p>
            <p className="text-gray-600 mb-2">Type: {product.type}</p>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Quantity:
                <select value={quantity} onChange={handleQuantityChange} className="ml-2 p-2 border rounded">
                  {Array.from({ length: product.quantity }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </label>
              <p className="text-lg font-bold mb-2">Total Price: ${totalPrice.toFixed(2)}</p>

              <button type="button" onClick={handleNext} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2">Next</button>
                
                
               {showDetails&& ( <div> 

                <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Name:</h3>
                <input type="text" placeholder="Name" value={dispatchLocation.username} onChange={(e) => setDispatchLocation({ ...dispatchLocation, username: e.target.value })} className="mb-2 p-2 border rounded" />
                {/* Add other dispatch location fields simarly */}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Phone Number</h3>
                <input type="text" placeholder="PhoneNumber" value={dispatchLocation.phonenumber} onChange={(e) => setDispatchLocation({ ...dispatchLocation, phonenumber: e.target.value })} className="mb-2 p-2 border rounded" />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Address</h3>
                <input type="text" placeholder="Address" value={dispatchLocation.address} onChange={(e) => setDispatchLocation({ ...dispatchLocation, address: e.target.value })} className="mb-2 p-2 border rounded" />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">City / Town / Village:</h3>
                <input type="text" placeholder="City/Town/Village" value={dispatchLocation.city} onChange={(e) => setDispatchLocation({ ...dispatchLocation, city: e.target.value })} className="mb-2 p-2 border rounded" />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">State:</h3>
                <input type="text" placeholder="state" value={dispatchLocation.state} onChange={(e) => setDispatchLocation({ ...dispatchLocation, state: e.target.value })} className="mb-2 p-2 border rounded" />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Mode of Payment:</h3>
                <label className="block mb-2">
                  <input type="radio" value="cashOnDelivery" checked={paymentMethod === 'cashOnDelivery'} onChange={handlePaymentMethodChange} className="mr-2" />
                  Cash on Delivery
                </label>
                <label className="block mb-2">
                  <input type="radio" value="bankTransfer" checked={paymentMethod === 'bankTransfer'} onChange={handlePaymentMethodChange} className="mr-2" />
                  Bank Transfer
                </label>
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Place Order</button>

                </div>
                )}
            </form>
          </div>
               
        </div>
      </div>
    </>
  );
};

export default Order;
