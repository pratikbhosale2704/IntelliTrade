// frontend/src/pages/Auth.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '../components/auth/AuthForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext'; // Correct import for login
import { toast } from 'react-toastify';


const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from AuthContext
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  // API endpoint base URL from environment variable or default to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://intellitrade-backend.onrender.com";

  // Handler for login
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      console.log('Login successful:', response.data);
      // Save token and handle successful login (e.g., update context, redirect)
      login(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  // Handler for signup
  const handleSignup = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, credentials);
      console.log('Signup successful:', response.data);
      toast.success('Signup successful!');
      // After signup, redirect to login view (or automatically log in)
      navigate('/auth');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden"
      >
        {/* Background Animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 opacity-10"
        >
          {/* You can use any icon/image here */}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-xl font-semibold pb-2 ${
              isLogin 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-xl font-semibold pb-2 ${
              !isLogin 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Render form based on mode */}
        {isLogin ? (
          <AuthForm onSubmit={handleLogin} buttonText="Log In" />
        ) : (
          <SignupForm onSubmit={handleSignup} buttonText="Sign Up" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Auth;
