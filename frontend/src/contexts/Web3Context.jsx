// frontend/src/contexts/Web3Context.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Web3 context
const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  // State to hold wallet address; null means no wallet is connected
  const [wallet, setWallet] = useState(null);

  // Dummy function to simulate wallet connection
  const connectWallet = () => {
    // In a real app, you'd integrate with Web3 provider (e.g., MetaMask)
    setWallet('0xDummyWalletAddress');
  };

  // Dummy function to simulate disconnecting the wallet
  const disconnectWallet = () => {
    setWallet(null);
  };

  return (
    <Web3Context.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to use the Web3Context
export const useWeb3 = () => useContext(Web3Context);
