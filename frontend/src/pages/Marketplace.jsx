// frontend/src/pages/Marketplace.jsx
import React, { useState, useEffect } from 'react';
import IPCard from '../components/marketplace/IPCard';
import Filters from '../components/marketplace/Filters';
import ViewDetailsModal from '../components/marketplace/ViewDetailsModal';
import { ethers } from 'ethers'; // Use ethers directly from the package
import { abi, contractAddress } from '../services/blockchain/main/constants.js';
import { toast } from 'react-toastify';

const Marketplace = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filters, setFilters] = useState({
    type: '', // Filter by type (e.g., "Patent", "Trademark", etc.)
    minPrice: '', // Minimum price
    maxPrice: '', // Maximum price
  });
  const [selectedAsset, setSelectedAsset] = useState(null); // State for the selected asset
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [userAddress, setUserAddress] = useState(null); // State to store the user's wallet address

  // Check if the user is logged in (connected to MetaMask)
  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          setIsLoggedIn(false);
        }
      } else {
        console.error('MetaMask is not installed.');
        setIsLoggedIn(false);
      }
    };

    checkMetaMaskConnection();
  }, []);

  const fetchAssets = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is required!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const assetIds = await contract.getAssetsListedForSale();
      const assets = await Promise.all(
        assetIds.map(async (id) => {
          try {
            const assetDetails = await contract.getAssetDetails(id);
            const [assetId, owner, assetType, price, expiryDate, isForSale] = assetDetails;

            // Only include assets that are marked as "For Sale"
            if (isForSale === true || isForSale === "true") {
              // Fetch title, description, and aiValuation from the database
              const response = await fetch(`http://localhost:8080/api/assets/${assetId}`);
              if (!response.ok) {
                console.error(`Failed to fetch details for asset ID ${assetId}`);
                return null;
              }
              const { title, description, aiValuation } = await response.json();

              // Handle missing description
              const validDescription = description || "No description available";

              return {
                id: assetId.toString(),
                owner: owner.toLowerCase(),
                title: title || `Asset ${assetId}`,
                description: validDescription,
                assetType,
                price: (price.toString() / 10 ** 18).toFixed(4), // Convert wei to ETH
                aiValuation: aiValuation || "N/A", // Fallback to "N/A" if missing
                expiryDate: new Date(Number(expiryDate.toString()) * 1000).toLocaleDateString(),
              };
            }
            return null; // Exclude assets not for sale
          } catch (err) {
            console.error(`Error fetching details for asset ID ${id}:`, err);
            return null;
          }
        })
      );

      // Remove duplicates and filter out null values
      const uniqueAssets = Array.from(new Map(assets.filter((asset) => asset !== null).map((asset) => [asset.id, asset])).values());

      setAssets(uniqueAssets);
      setFilteredAssets(uniqueAssets); // Initialize filtered assets
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error('Failed to fetch assets. Check console for details.');
    }
  };

  // Fetch assets on component mount
  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filter,
    }));
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Marketplace
      </h1>
      <Filters onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredAssets.map((asset) => (
          <IPCard
            key={asset.id}
            asset={{
              ...asset,
              description: asset.description.length > 50
                ? `${asset.description.substring(0, 50)}...`
                : asset.description, // Truncate description
            }}
            isLoggedIn={isLoggedIn}
            userAddress={userAddress}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      {isModalOpen && (
        <ViewDetailsModal asset={selectedAsset} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Marketplace;

