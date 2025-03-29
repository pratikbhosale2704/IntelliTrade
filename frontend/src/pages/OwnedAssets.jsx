import React, { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const OwnedAssets = () => {
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getOwnedAssets = async () => {
    console.log('Fetching owned assets...');

    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const provider = new ethers.BrowserProvider(window.ethereum);

      // Check if MetaMask is already connected
      const accounts = await provider.listAccounts();

      if (accounts.length === 0) {
        console.log('MetaMask is not connected. Requesting connection...');
        await provider.send('eth_requestAccounts', []);
      }

      // Get the user's address (first account)
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log('Connected wallet address:', userAddress);

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Call the Solidity function `getUserAssets`
      const ownedAssetsRaw = await contract.getUserAssets();
      console.log('Owned assets (raw):', ownedAssetsRaw);

      // Convert BigInt values to strings
      const ownedAssetsFormatted = ownedAssetsRaw.map((assetId) => assetId.toString());
      console.log('Owned assets (formatted):', ownedAssetsFormatted);

      // Fetch additional details for each asset from the database
      const assetsWithDetails = await Promise.all(
        ownedAssetsFormatted.map(async (assetID) => {
          try {
            console.log("Fetching details for asset ID:", assetID);
            const response = await fetch(`http://localhost:8080/api/assets/${assetID}`);
            console.log("Response status:", response.status);
            console.log("Response content-type:", response.headers.get('content-type'));

            if (!response.ok) {
              throw new Error(`Failed to fetch details for asset ID: ${assetID}`);
            }

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new Error(`Invalid response format for asset ID: ${assetID}`);
            }

            const assetDetails = await response.json();
            return { id: assetID, ...assetDetails };
          } catch (err) {
            console.error(`Error fetching details for asset ID ${assetID}:`, err);
            return { id: assetID, error: 'Failed to fetch details' };
          }
        })
      );

      console.log('Assets with details:', assetsWithDetails);
      setOwnedAssets(assetsWithDetails);
    } catch (err) {
      console.error('Error fetching owned assets:', err);
      setError('Error fetching owned assets: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Owned Assets</h1>
      <button
        onClick={getOwnedAssets}
        className="block mx-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 mb-6"
      >
        Fetch Owned Assets
      </button>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {ownedAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownedAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-blue-800">Asset ID: {asset.id}</h2>
              {asset.error ? (
                <p className="text-red-500">{asset.error}</p>
              ) : (
                <>
                  <p className="text-gray-600">
                    <strong>Title:</strong> {asset.title || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <strong>Description:</strong> {asset.description || 'N/A'}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && (
          <p className="text-center text-gray-600 text-lg">You do not own any assets yet.</p>
        )
      )}
    </div>
  );
};

export default OwnedAssets;