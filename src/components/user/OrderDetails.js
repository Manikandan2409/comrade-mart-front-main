import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const OrderDetails = () => {
  const { authState, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/orders/view-ordered-products', {
          headers: {
            Authorization: `${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);


  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  
      const response = await axios.get('http://localhost:8080/orders/pdf', {
        headers: {
          Authorization: `${token}`,
        },
        responseType: 'blob', // Important to get the response as a blob
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', authState.userId+'OrderDetails.pdf'); // or dynamic filename
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };
  
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Product Price</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Payment Method</th>
            <th className="py-2 px-4 border-b">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{order.orderId}</td>
              <td className="py-2 px-4 border-b">{order.productName}</td>
              <td className="py-2 px-4 border-b">{order.productPrice}</td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">&#8377;{order.totalPrice}</td>
              {/* <td className="py-2 px-4 border-b">{order.modeOfPayment}</td> */}
              <td className="py-2 px-4 border-b">
                {order.modeOfPayment === 'cashOnDelivery' ? (
                  <p>COD</p>
                ) : (
                  <p>BT</p>
                )}
              </td>
              <td className="py-2 px-4 border-b">
  {order.isDelivered === true ? (
    <p>Processing...</p>
  ) : (
    <p>Delivered</p>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
      <p className="py-2 px-4 border-b"> COD = CASH ON DELIVERY || BT= Bank transfer</p>
      <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Download PDF
      </button>
    </div>
  );
};

export default OrderDetails;
