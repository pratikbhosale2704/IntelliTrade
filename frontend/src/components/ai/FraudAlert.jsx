// frontend/src/components/ai/FraudAlert.jsx
import React from 'react';

const FraudAlert = ({ alertMessage }) => {
  return (
    <div className="p-4 border border-red-500 bg-red-100 rounded">
      <h3 className="text-xl font-bold text-red-700">Fraud Alert</h3>
      <p>{alertMessage || 'No fraudulent activity detected.'}</p>
    </div>
  );
};

export default FraudAlert;
