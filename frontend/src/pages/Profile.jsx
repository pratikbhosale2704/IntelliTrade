// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Profile = () => {
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [walletLinked, setWalletLinked] = useState(false); // State to track wallet connection
  const [assetsOwned, setAssetsOwned] = useState(0); // State for assets owned
  const [transactions, setTransactions] = useState(0); // State for transactions
  const [totalValue, setTotalValue] = useState(0); // State for total value in Wei
  const navigate = useNavigate(); // For redirection

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://intellitrade-backend.onrender.com";

  useEffect(() => {
    if (!user) {
      navigate('/auth'); // Redirect to login page if not logged in
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token for authentication
          },
        });
        setUserData(response.data); // Set the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        toast.error('Failed to fetch user data.'); // Toastify error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletLinked(true); // Set wallet as linked
        toast.success(`Connected to MetaMask`); // Toastify success
        fetchBlockchainData(accounts[0]); // Fetch blockchain data after connecting
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        toast.error('Failed to connect to MetaMask.'); // Toastify error
      }
    } else {
      toast.error('MetaMask is not installed. Please install MetaMask and try again.'); // Toastify error
    }
  };

  const fetchBlockchainData = async (userAddress) => {
    if (!window.ethereum) {
      toast.error('MetaMask is required!'); // Toastify error
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Fetch assets owned by the user
      const ownedAssets = await contract.getUserAssets(); // No parameters required
      setAssetsOwned(ownedAssets.length);

      // Calculate total value of owned assets
      let totalValueInWei = BigInt(0);
      for (const assetId of ownedAssets) {
        const assetDetails = await contract.getAssetDetails(assetId);
        totalValueInWei += BigInt(assetDetails[4]); // Add the price (in wei)
      }
      setTotalValue(totalValueInWei.toString()); // Store total value in Wei

      // Fetch transaction count (pass the user's address)
      const transactionCount = await contract.getTransactionCount(userAddress);
      setTransactions(transactionCount.toString());

      toast.success('Blockchain data fetched successfully!'); // Toastify success
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
      toast.error('Failed to fetch blockchain data.'); // Toastify error
    }
  };

  useEffect(() => {
    if (walletLinked && userData?.walletAddress) {
      fetchBlockchainData(userData.walletAddress);
    }
  }, [walletLinked, userData]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-4xl text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Information Section */}
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Profile Information</h2>
            <p className="mb-2">
              <strong>Name:</strong> {userData?.firstName} {userData?.lastName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {userData?.email}
            </p>
            <p className="mb-2">
              <strong>Contact Number:</strong> {userData?.contactNumber || "N/A"}
            </p>
          </div>

          {/* Wallet Section */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Wallet</h2>
            <p className="mb-4">
              <strong>Linked Wallet:</strong> {walletLinked ? "Linked" : "Not Linked"}
            </p>
            {!walletLinked ? (
              <button
                onClick={connectToMetaMask}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Link Crypto Wallet
              </button>
            ) : (
              <span className="text-sm bg-green-500 text-white py-2 px-4 rounded-lg">
                Wallet Linked
              </span>
            )}
          </div>
        </div>

        {/* Account Stats Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Account Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Assets Owned</p>
              <p className="text-2xl font-bold text-gray-800">{assetsOwned} Assets</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-800">{transactions} completed</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-800">{totalValue} Wei</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
