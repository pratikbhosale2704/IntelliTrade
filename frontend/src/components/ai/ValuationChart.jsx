// frontend/src/components/ai/ValuationChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2'; // Assuming you install chart.js and react-chartjs-2

const ValuationChart = ({ data }) => {
  // Dummy chart data if none provided
  const chartData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Valuation Trend',
        data: [1000, 1200, 1150, 1300, 1250],
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Valuation Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ValuationChart;
