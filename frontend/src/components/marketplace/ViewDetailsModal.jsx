import React from 'react';

const ViewDetailsModal = ({ asset, onClose }) => {
  if (!asset) return null; // If no asset is selected, don't render the modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{asset.title}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Description:</strong> {asset.description}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Type:</strong> {asset.assetType}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> ETH {asset.price}
        </p>
        {asset.aiValuation && (
          <p className="text-gray-600 mb-2">
            <strong>AI Valuation:</strong> ${asset.aiValuation}
          </p>
        )}
        <p className="text-gray-600 mb-2">
          <strong>Expiry Date:</strong> {asset.expiryDate}
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;