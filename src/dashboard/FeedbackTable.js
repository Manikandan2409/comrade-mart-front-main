import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEnvelope, FaTrash } from 'react-icons/fa';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState({ unmailed: [], mailed: [] });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isMailPanelOpen, setIsMailPanelOpen] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/feedback/get-all-feedbacks')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback data!', error);
      });
  }, []);

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleMail = (feedback) => {
    setSelectedFeedback(feedback);
    setIsMailPanelOpen(true);
  };

  const handleSendMail = () => {
    axios.post('http://localhost:8080/feedback/mail', {
      id: selectedFeedback.id,
      response: responseText,
    })
    .then(response => {
      alert('Mail sent successfully!');
      setIsMailPanelOpen(false);
      setResponseText('');
      // Optionally, refresh the feedback list here
    })
    .catch(error => {
      console.error('Error sending mail!', error);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/feedback/${id}`)
      .then(response => {
        alert('Feedback deleted successfully!');
        setFeedbacks((prev) => ({
          unmailed: prev.unmailed.filter(fb => fb.id !== id),
          mailed: prev.mailed.filter(fb => fb.id !== id),
        }));
      })
      .catch(error => {
        console.error('Error deleting feedback!', error);
      });
  };

  const closePanel = () => {
    setSelectedFeedback(null);
    setIsMailPanelOpen(false);
    setResponseText('');
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unmailed Feedbacks */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Not Responded (Unmailed)</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.unmailed.map(feedback => (
                <tr key={feedback.id}>
                  <td className="border px-4 py-2">{feedback.id}</td>
                  <td className="border px-4 py-2">{feedback.username}</td>
                  <td className="border px-4 py-2">{feedback.email}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button onClick={() => handleView(feedback)} className="text-blue-500"><FaEye /></button>
                    <button onClick={() => handleMail(feedback)} className="text-green-500"><FaEnvelope /></button>
                    <button onClick={() => handleDelete(feedback.id)} className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mailed Feedbacks */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Responded (Mailed)</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.mailed.map(feedback => (
                <tr key={feedback.id}>
                  <td className="border px-4 py-2">{feedback.id}</td>
                  <td className="border px-4 py-2">{feedback.username}</td>
                  <td className="border px-4 py-2">{feedback.email}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button onClick={() => handleView(feedback)} className="text-blue-500"><FaEye /></button>
                    <button onClick={() => handleDelete(feedback.id)} className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Panel */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Feedback Details</h3>
            <p><strong>ID:</strong> {selectedFeedback.id}</p>
            <p><strong>Username:</strong> {selectedFeedback.username}</p>
            <p><strong>Email:</strong> {selectedFeedback.email}</p>
            <p><strong>Description:</strong> {selectedFeedback.description}</p>
            <button onClick={closePanel} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Mail Panel */}
      {isMailPanelOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Send Mail</h3>
            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              rows="4"
              placeholder="Type your response here..."
            />
            <div className="mt-4 flex space-x-2">
              <button onClick={handleSendMail} className="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
              <button onClick={closePanel} className="bg-red-500 text-white py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
