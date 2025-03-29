// frontend/src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [walletAddress, setWalletAddress] = useState(null); // State for MetaMask wallet address

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]); // Set the connected wallet address
        toast.success(`Connected to MetaMask`);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        toast.error('Failed to connect to MetaMask.');
      }
    } else {
      toast.error('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">IntelliTrade</Link>
        </h1>
        <nav className="flex items-center">
          <Link to="/marketplace" className="mr-4">
            Marketplace
          </Link>
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
          <Link to="/profile" className="mr-4">
            Profile
          </Link>
          {user && (
            <Link to="/assets" className="mr-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Manage Assets
            </Link>
          )}
          {user ? (
            <>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-4"
              >
                Logout
              </button>
              {!walletAddress ? (
                <button
                  onClick={connectToMetaMask}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  Connect to MetaMask
                </button>
              ) : (
                <span className="text-l bg-green-600 text-white py-2 px-4 rounded">
                  Connected
                </span>
              )}
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
