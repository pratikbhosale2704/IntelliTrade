// frontend/src/contexts/MarketplaceContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Marketplace context
const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  // State for marketplace items and filters
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  // Function to update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Function to update marketplace items
  const updateItems = (newItems) => {
    setItems(newItems);
  };

  return (
    <MarketplaceContext.Provider value={{ items, filters, updateFilters, updateItems }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

// Custom hook to use the MarketplaceContext
export const useMarketplace = () => useContext(MarketplaceContext);
