import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Order from './components/user/Order';
import { AuthProvider } from './components/auth/AuthContext';
import './index.css';
import ProductForm from './dashboard/ProductForm';
import reportWebVitals from './reportWebVitals';
import Dashboard from './dashboard/DashBoard';
import FeedbackTable from './dashboard/FeedbackTable';
import ProductCard from './components/products/ProductCard';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap your routing and application logic within the root renderer
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/order/product/:productId" element={<Order />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feedbacktable" element={<FeedbackTable/>}/>
          <Route path="/addproduct" element={<ProductForm/>}/>
        </Routes>
      </Router>
      
    </AuthProvider>
    {/* <ProductCard/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
