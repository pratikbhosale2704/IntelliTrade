// frontend/src/components/auth/Web3Login.jsx
import React from 'react';

const Web3Login = () => {
  // In a real app, you'll integrate with Web3 (MetaMask, WalletConnect, etc.)
  return (
    <div>
      <h2>Web3 Login</h2>
      <button onClick={() => alert('Web3 login triggered')}>
        Connect Wallet
      </button>
    </div>
  );
};

export default Web3Login;
