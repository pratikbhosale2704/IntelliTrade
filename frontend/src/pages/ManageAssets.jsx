import React from 'react';
import { Link } from 'react-router-dom';

const ManageAssets = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      {/* Glass-like container */}
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Manage Assets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Link
              to="/upload-ip"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center"
            >
              Mint Asset
            </Link>
            <Link
              to="/list-asset-for-sale"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center"
            >
              List Asset For Sale
            </Link>
            <Link
              to="/remove-asset-from-sale"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center"
            >
              Remove Asset From Sale
            </Link>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Link
              to="/owned-assets"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center"
            >
              Get Owned Assets
            </Link>
            <Link
              to="/asset-details"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 text-center"
            >
              Get Asset Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAssets;