// frontend/src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4 text-center bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} IntelliTrade. All rights reserved.</p>
      <p>
        <a href="/terms" className="underline">Terms</a> |{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>
      </p>
    </footer>
  );
};

export default Footer;
