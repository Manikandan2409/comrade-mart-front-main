import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        password: data.password,
      };

      const response = await axios.post('http://localhost:8080/user/login', payload);

      if (response.data && response.data.data && response.data.data.accessToken) {
        const token = response.data.data.accessToken;
        
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);

        const { name, emailId } = decodedToken;

       // console.log(name);
       // console.log(emailId);
        localStorage.setItem('username', name);
        localStorage.setItem('email', emailId);

        login(token);
        alert('Login successful');
        navigate('/');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600" htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Login</button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:underline">Forgot Password? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
