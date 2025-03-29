import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-blue-600 p-2 rounded-md"
      >
        ☰
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
  className={`absolute top-10 right-0 bg-blue-100 shadow-md rounded-md p-4 z-10 transition-transform duration-500 ${
    isOpen ? "scale-100" : "scale-0"
  } w-64`}
>          <Link
            to="/marketplace"
            className="block text-blue-600 font-bold mb-2 hover:underline"
          >
            Marketplace
          </Link>
          <Link
            to="/assets"
            className="block text-blue-600 font-bold mb-2 hover:underline"
          >
            Manage Assets
          </Link>
          {/* <Link
            to="/nft-marketplace"
            className="block text-orange-600 font-bold hover:underline"
          >
            NFT Marketplace
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;