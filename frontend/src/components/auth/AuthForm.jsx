// frontend/src/components/auth/AuthForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthForm = ({ onSubmit, buttonText }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  // Dummy MetaMask connect handler
  const handleMetaMaskConnect = async () => {
    // In a real implementation, integrate with a Web3 provider (e.g., MetaMask via ethers.js)
    console.log('MetaMask connect triggered');
    alert('MetaMask connect triggered');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 mb-1">Email:</label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Password:</label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {buttonText || 'Log In'}
      </button>
      <motion.button
        type="button"
        onClick={handleMetaMaskConnect}
        whileHover={{ scale: 1.05 }}
        className="w-full mt-4 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
      >
        {/* Optionally include a MetaMask icon */}
        <img src="/metamask-icon.svg" alt="MetaMask" className="h-6 w-6 mr-2" />
        Connect with MetaMask
      </motion.button>
    </form>
  );
};

export default AuthForm;
