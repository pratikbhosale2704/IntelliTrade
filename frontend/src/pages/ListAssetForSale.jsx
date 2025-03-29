import React, { useState } from 'react';
// import { ethers } from '../../JS/ethers-6.7.esm.min.js';
import { ethers } from 'ethers'; // Use ethers directly from the package
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const ListAssetForSale = () => {
  const [formData, setFormData] = useState({
    assetId: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const listForSale = async () => {
    const { assetId, price } = formData;

    if (!assetId || !price) {
      toast.error('All fields are required for listing the asset.');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const priceInWei = ethers.parseEther(price); // Convert price from ETH to WEI

      console.log('Listing asset for sale:', { assetId, price });
      const transactionResponse = await contract.ListForSale(assetId, priceInWei);
      console.log('Transaction response:', transactionResponse);
      await transactionResponse.wait(1);

      toast.success('Asset listed for sale successfully!');
    } catch (err) {
      console.error('Error listing asset:', err);
      toast.error('Error: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await listForSale(); // Call the listForSale function when the form is submitted
  };

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">List Asset For Sale</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="assetId"
            className="block text-blue-800 font-bold mb-2"
          >
            Asset ID
          </label>
          <input
            type="text"
            id="assetId"
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter asset ID"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-blue-800 font-bold mb-2"
          >
            Price (in ETH)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          List Asset
        </button>
      </form>
    </div>
  );
};

export default ListAssetForSale;