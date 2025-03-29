// frontend/src/components/dashboard/AIInsights.jsx
import React from 'react';

const AIInsights = ({ insights }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2>AI Insights</h2>
      {insights && insights.length > 0 ? (
        <ul>
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      ) : (
        <p>No insights available.</p>
      )}
    </div>
  );
};

export default AIInsights;
