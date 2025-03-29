// frontend/src/components/marketplace/AuctionBid.jsx
import React, { useState } from 'react';

const AuctionBid = ({ onBidSubmit }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBidSubmit = (e) => {
    e.preventDefault();
    onBidSubmit(bidAmount);
  };

  return (
    <form onSubmit={handleBidSubmit} className="p-4 border rounded">
      <h4>Place Your Bid</h4>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Bid Amount"
        required
      />
      <button type="submit">Submit Bid</button>
    </form>
  );
};

export default AuctionBid;
