// frontend/src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line } from 'recharts';
import { 
  WalletIcon, 
  DocumentChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/solid';
import AIInsights from '../components/dashboard/AIInsights';
import WalletBalance from '../components/dashboard/WalletBalance';
import CountUp from 'react-countup';


const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to /auth if no user is logged in
  useEffect(() => {
    console.log("User in Dashboard:", user); // Debugging

    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Dummy data for demonstration purposes
  const portfolioData = [
    { value: 4000 },
    { value: 6500 },
    { value: 4800 },
    { value: 8100 }
  ];
  const recentTransactions = [
    { id: 1, asset: 'AI Patent', type: 'Sale', amount: '$12,400' },
    { id: 2, asset: 'Trademark', type: 'Purchase', amount: '$8,200' },
  ];
  const dummyInsights = [
    'Your IP Asset "Patent A" is trending upward.',
    'New valuation data available for "Trademark B".',
  ];
  const dummyBalance = 2500;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="bg-white p-3 rounded-lg shadow-sm"
            >
              <WalletIcon className="h-6 w-6 text-blue-600" />
            </motion.div>
            <p className="text-gray-600">{user ? user.email : 'Guest'}</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: DocumentChartBarIcon, title: "Active Listings", value: "24", color: "bg-blue-100" },
            { icon: CurrencyDollarIcon, title: "Portfolio Value", value: "$86.4K", color: "bg-green-100" },
            { icon: ArrowTrendingUpIcon, title: "30d Return", value: "+12.4%", color: "bg-purple-100" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl ${stat.color} backdrop-blur-sm bg-opacity-50`}
            >
              <stat.icon className="h-8 w-8 text-gray-700 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: DocumentChartBarIcon, title: "Active Listings", value: 24, color: "bg-blue-100" },
          { icon: CurrencyDollarIcon, title: "Portfolio Value", value: 86400, prefix: "$", color: "bg-green-100" },
          { icon: ArrowTrendingUpIcon, title: "30d Return", value: 12.4, suffix: "%", color: "bg-purple-100" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl ${stat.color} backdrop-blur-sm bg-opacity-50`}
          >
            <stat.icon className="h-8 w-8 text-gray-700 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                decimals={stat.value % 1 !== 0 ? 1 : 0} // Show decimals if the value is not an integer
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
              />
            </p>
          </motion.div>
        ))}
      </div>
        {/* Portfolio Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-2xl shadow-sm mb-8 overflow-x-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Portfolio Growth</h2>
          <LineChart width={Math.min(800, window.innerWidth - 64)} height={300} data={portfolioData}>
            <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <AnimatePresence>
            {recentTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.asset}</p>
                  <p className="text-sm text-gray-500">{transaction.type}</p>
                </div>
                <p className="font-semibold">{transaction.amount}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* AI Insights and Wallet Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <AIInsights insights={dummyInsights} />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <WalletBalance balance={dummyBalance} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
