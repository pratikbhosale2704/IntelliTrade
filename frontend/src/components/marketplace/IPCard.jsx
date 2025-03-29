// frontend/src/components/marketplace/IPCard.jsx
import React from 'react';
// import { ethers } from '../../JS/ethers-6.7.esm.min.js';
import { ethers } from 'ethers'; // Use ethers directly from the package
import { abi, contractAddress } from '../../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const IPCard = ({ asset, isLoggedIn, userAddress, onViewDetails }) => {
  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      toast.info('You need to log in to buy this asset.');
      return;
    }

    try {
      if (asset.owner.toLowerCase() === userAddress.toLowerCase()) {
        toast.error('You cannot buy your own asset.');
        return;
      }

      if (!asset.isForSale) {
        toast.info('This asset is not for sale.');
        return;
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiryTimestamp = new Date(asset.expiryDate).getTime() / 1000;
      if (expiryTimestamp < currentTimestamp + 86400) {
        toast.info('This asset expires too soon.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log(`Buying asset: ${asset.title}`);
      const transactionResponse = await contract.BuyAsset(asset.id, {
        value: ethers.parseEther(asset.price),
        gasLimit: 300000, // Adjust gas limit if necessary
      });

      await transactionResponse.wait();
      toast.success('Purchase successful!');
      window.location.reload();
    } catch (error) {
      console.error('Error purchasing asset:', error);
      toast.error(error.message || 'Purchase failed.');
    }
  };

  return (
    <div className="border p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{asset.title}</h3>
        <p className="text-gray-600 mb-2">{asset.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Type:</span> {asset.assetType}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Price:</span> ETH {asset.price}
        </p>
        {asset.aiValuation && (
          <p className="mb-4">
            <span className="font-semibold">AI Valuation:</span> ETH {asset.aiValuation}
          </p>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300"
          onClick={() => onViewDetails(asset)}
        >
          View Details
        </button>
        <button
          className={`w-full ${
            isLoggedIn
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          } text-white py-2 rounded-lg transition-colors duration-300`}
          onClick={handleBuyNow}
          disabled={!isLoggedIn}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default IPCard;
