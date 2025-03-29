// frontend/src/pages/UploadIP.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const UploadIP = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assetType: 'Patent',
    price: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log('Uploaded file:', e.target.files[0]);
  };

  // const storeAssetInDB = async (assetData) => {
  //   try {
  //     console.log("Sending asset data to backend:", assetData);
  //     const response = await fetch("http://localhost:8080/api/assets", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(assetData),
  //     });

  //     const responseBody = await response.json();
  //     console.log("Backend response:", responseBody);

  //     if (!response.ok) {
  //       throw new Error(`Failed to store asset in the database: ${responseBody.error || response.statusText}`);
  //     }

  //     console.log("Asset stored in MongoDB successfully.");
  //   } catch (error) {
  //     console.error("Error storing asset in MongoDB:", error);
  //     throw error;
  //   }
  // };

  const storeAssetInDB = async (assetData) => {
    try {
      console.log("Sending asset data to backend:", assetData); // Debugging log
      const response = await fetch("https://intellitrade-backend.onrender.com/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData),
      });
  
      const responseBody = await response.json();
      console.log("Backend response:", responseBody); // Debugging log
  
      if (!response.ok) {
        throw new Error(`Failed to store asset in the database: ${responseBody.error || response.statusText}`);
      }
  
      console.log("Asset stored in MongoDB successfully.");
    } catch (error) {
      console.error("Error storing asset in MongoDB:", error);
      throw error;
    }
  };

  const calculateAIInputFields = (description) => {
    const textLength = description.length;
    const numKeywords = description
      .split(' ')
      .filter((word) =>
        ['patent', 'copyright', 'trademark', 'solar', 'energy', 'renewable'].includes(word.toLowerCase())
      ).length;

    // Example default values for categories
    const category_Copyright = formData.assetType === 'Copyright' ? 1 : 0;
    const category_Patent = formData.assetType === 'Patent' ? 1 : 0;
    const category_Trademark = formData.assetType === 'Trademark' ? 1 : 0;

    return {
      text_length: textLength,
      num_keywords: numKeywords,
      citation_counts: 0, // Default value
      category_Copyright,
      category_Patent,
      category_Trademark,
    };
  };

  const mint = async () => {
  console.log('Mint button clicked');
  const { title, description, assetType, price, expiryDate } = formData;

  if (!title || !description || !assetType || !price || !expiryDate) {
    toast.error('All fields are required for minting the asset.');
    return;
  }

  if (typeof window.ethereum === 'undefined') {
    toast.error('MetaMask is not installed. Please install MetaMask.');
    return;
  }

  try {
    // Convert the expiry date to a Unix timestamp
    const expiryTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Convert price from ETH to wei
    const priceWei = ethers.parseEther(price);

    console.log('Minting asset:', { assetType, price: priceWei.toString(), expiry: expiryTimestamp });
    const transactionResponse = await contract.MintAsset(
      assetType,
      priceWei,
      expiryTimestamp
    );

    console.log('Transaction response:', transactionResponse);
    await transactionResponse.wait(1);

    // Retrieve the latest asset ID from the contract
    const latestAssetID = await contract.getLatestAssetID();
    console.log('Minted asset ID:', latestAssetID.toString());

    // Store the asset data in MongoDB without `aiValuation`
    await storeAssetInDB({
      assetID: latestAssetID.toString(),
      title,
      description,
      aiValuation: null, // Initially set to null
    });

    // Calculate AI input fields
    const aiInputFields = calculateAIInputFields(description);

    // Call the AI valuation API
    const aiResponse = await fetch("http://localhost:5000/predict-price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raw_description: description, // Send raw_description
        cleaned_description: description.toLowerCase(), // Send cleaned_description
        ...aiInputFields, // Include calculated fields
      }),
    });

    const aiData = await aiResponse.json();
    console.log("AI API Response:", aiData); // Debugging log
    if (!aiResponse.ok) {
      throw new Error(aiData.error || "Failed to fetch AI valuation");
    }

    console.log("AI Valuation:", aiData.estimated_price);

    // Update the `aiValuation` in MongoDB
    await fetch(`https://intellitrade-backend.onrender.com/api/assets/${latestAssetID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aiValuation: aiData.estimated_price }),
    });

    toast.success('Asset minted and stored successfully!');
  } catch (err) {
    console.error('Error minting asset:', err);
    toast.error('Error: ' + err.message);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Uploading IP asset:', formData);
    await mint(); // Call the mint function when the form is submitted
  };

  return (
    <div className="container mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Upload Intellectual Property
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-blue-800 font-bold mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter asset title"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-bold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter asset description"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-bold mb-2">Asset Type:</label>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Patent">Patent</option>
            <option value="Copyright">Copyright</option>
            <option value="Trademark">Trademark</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-800 font-bold mb-2">Price (ETH):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-bold mb-2">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Expiry Date"
            required
          />
        </div>
        <div>
          <label className="block text-blue-800 font-bold mb-2">Upload Document:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadIP;
