import React, { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const AssetDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assetDetails, setAssetDetails] = useState(null);
  const [error, setError] = useState('');

  const getAssetDetails = async () => {
    const assetId = searchQuery.trim(); // Get user input and trim spaces

    // Validate input
    if (!assetId) {
      toast.error('Asset ID is required to view details.');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
      // Connect to Ethereum provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log('Fetching asset details for ID:', assetId);

      // Call the smart contract function
      const assetDetails = await contract.getAssetDetails(assetId);
      console.log('Asset details:', assetDetails);

      if (!assetDetails || assetDetails.length === 0) {
        setError('No asset details found.');
        setAssetDetails(null);
        return;
      }

      // Destructure response and convert BigNumbers to strings
      const [id, owner, assetType, price, expiryDate, isForSale] = assetDetails;
      const expiryDateFormatted = expiryDate
        ? new Date(Number(expiryDate.toString()) * 1000).toLocaleString()
        : 'Invalid Date';

      // Fetch title and description from the backend
      // const response = await fetch(`http://localhost:8080/api/assets/${assetId}`);
      const response = await fetch(`https://intellitrade-backend.onrender.com/api/assets/${assetId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch asset details from the database.');
      }
      const { title, description } = await response.json();

      // Set the asset details in state
      setAssetDetails({
        id: id.toString(),
        owner,
        assetType,
        price: (price.toString() / 10 ** 18).toFixed(4), // Convert wei to ETH
        expiryDate: expiryDateFormatted,
        isForSale: isForSale ? 'Yes' : 'No',
        title,
        description,
      });
      setError('');
    } catch (err) {
      console.error('Error fetching asset details:', err);
      setError('Error fetching details: ' + (err.message || 'Unknown error'));
      setAssetDetails(null);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Get Asset Details</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-blue-800 font-bold mb-2"
          >
            Search by Asset ID:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter asset ID"
          />
        </div>
        <button
          onClick={getAssetDetails}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-center text-red-500 font-bold mt-4">{error}</p>
      )}

      {assetDetails && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Asset Details
          </h2>
          <p className="text-gray-600">
            <strong>Asset ID:</strong> {assetDetails.id}
          </p>
          <p className="text-gray-600">
            <strong>Owner:</strong> {assetDetails.owner}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong> {assetDetails.assetType}
          </p>
          <p className="text-gray-600">
            <strong>Title:</strong> {assetDetails.title || 'N/A'}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong> {assetDetails.description || 'N/A'}
          </p>
          <p className="text-gray-600">
            <strong>Price (ETH):</strong> {assetDetails.price} ETH
          </p>
          <p className="text-gray-600">
            <strong>Expiry Date:</strong> {assetDetails.expiryDate}
          </p>
          <p className="text-gray-600">
            <strong>For Sale:</strong> {assetDetails.isForSale}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;