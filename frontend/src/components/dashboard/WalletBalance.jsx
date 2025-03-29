// frontend/src/components/dashboard/WalletBalance.jsx
import React from 'react';

const WalletBalance = ({ balance }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2>Wallet Balance</h2>
      <p>${balance}</p>
    </div>
  );
};

export default WalletBalance;
