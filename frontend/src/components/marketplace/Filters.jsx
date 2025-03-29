// frontend/src/components/marketplace/Filters.jsx
import React from 'react';

const Filters = ({ onFilterChange }) => {
  return (
    <div className="p-6 bg-white rounded shadow-md mb-6">
      <h4 className="text-xl font-semibold text-gray-700 mb-4">Filter IP Assets</h4>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Category:</label>
        <select
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Price Range(ETH):</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            className="w-1/2 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            className="w-1/2 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
