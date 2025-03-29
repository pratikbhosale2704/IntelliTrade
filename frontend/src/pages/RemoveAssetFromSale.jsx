import React, { useState, useEffect } from 'react';
// import { ethers } from '../../main/ethers-6.7.esm.min.js';
import { ethers } from 'ethers'; // Use ethers directly from the package
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const RemoveAssetFromSale = () => {
  const [assetsForSale, setAssetsForSale] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the list of assets currently for sale
  const fetchAssetsForSale = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log('Fetching assets listed for sale...');
      const assetIds = await contract.getAssetsListedForSale();

      // Fetch details for each asset
      const assets = await Promise.all(
        assetIds.map(async (id) => {
          const assetDetails = await contract.getAssetDetails(id);
          const [assetId, owner, assetType, price, expiryDate, isForSale] = assetDetails;

          // Only include assets that are marked as "For Sale"
          if (isForSale) {
            return {
              id: assetId.toString(),
              name: assetType,
              price: (price.toString() / 10 ** 18).toFixed(4), // Convert wei to ETH
              expiryDate: new Date(Number(expiryDate.toString()) * 1000).toLocaleString(),
            };
          }
          return null;
        })
      );

      // Filter out null values and update state
      setAssetsForSale(assets.filter((asset) => asset !== null));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching assets for sale:', err);
      setLoading(false);
      toast.error('Error fetching assets for sale: ' + err.message);
    }
  };

  // Remove an asset from sale
  const removeFromSale = async (id) => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log('Removing asset from sale:', { id });
      const transactionResponse = await contract.RemoveAssetFromSale(id);
      console.log('Transaction response:', transactionResponse);
      await transactionResponse.wait(1);

      toast.success(`Asset with ID ${id} removed from sale successfully!`);
      // Refresh the list of assets for sale
      fetchAssetsForSale();
    } catch (err) {
      console.error('Error removing asset from sale:', err);
      toast.error('Error: ' + err.message);
    }
  };

  // Fetch assets for sale on component mount
  useEffect(() => {
    fetchAssetsForSale();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Remove Asset From Sale</h1>
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading assets for sale...</p>
      ) : assetsForSale.length > 0 ? (
        <div className="space-y-4 max-w-2xl mx-auto">
          {assetsForSale.map((asset) => (
            <div
              key={asset.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div>
                <h2 className="text-lg font-bold text-blue-800">{asset.name}</h2>
                <p className="text-gray-600">Price: {asset.price} ETH</p>
                <p className="text-gray-600">Expiry Date: {asset.expiryDate}</p>
              </div>
              <button
                onClick={() => removeFromSale(asset.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No assets currently listed for sale.</p>
      )}
    </div>
  );
};

export default RemoveAssetFromSale;