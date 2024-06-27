import React, { useState } from 'react';
import axios from 'axios';
import feedback from '../assets/feedback.png';

const Feedback = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    description: 'Hello from demo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/feedback/add-feedback', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        alert('Feedback submitted successfully!');
        setFormData({
          username: '',
          email: '',
          description: ''
        });
      })
      .catch(error => {
        console.error('There was an error submitting the feedback!', error);
      });
  };

  return (
<>
    <h2 className="text-3xl font-bold mb-6 text-center">
        Feed <span className="text-gray-500">Back</span>
      </h2>
    <div className="flex flex-col md:flex-row justify-center  min-h-96 items-center  bg-gray-100 p-4">
            
      <div className="flex-1 flex   p-4">
        <img 
          src={feedback} 
          alt="Feedback Illustration" 
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
      
      <div className="flex-1 mr-10 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>

    </>
  );
};

export default Feedback;
