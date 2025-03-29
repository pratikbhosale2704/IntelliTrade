import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-32 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Welcome to 
            <span className="block mt-4 bg-gradient-to-r from-cyan-400 to-green-300 bg-clip-text text-transparent">
              IntelliTrade
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90"
          >
            Revolutionize IP Trading with AI & Blockchain
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/marketplace"
              className="relative bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl shadow-blue-500/30"
            >
              Explore Marketplace
              <span className="absolute inset-0 rounded-xl border-2 border-white/20"></span>
            </Link>
            <Link 
              to="/auth"
              className="relative border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Sign Up Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Platform Benefits
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheckIcon,
                title: "Secure Transactions",
                desc: "Blockchain-powered security for all IP transfers",
                color: "bg-blue-100"
              },
              {
                icon: SparklesIcon,
                title: "AI Valuation",
                desc: "Smart pricing powered by machine learning",
                color: "bg-purple-100"
              },
              {
                icon: CurrencyDollarIcon,
                title: "Transparent Fees",
                desc: "Clear pricing with no hidden costs",
                color: "bg-cyan-100"
              },
              {
                icon: ArrowPathIcon,
                title: "Instant Trading",
                desc: "Real-time settlement of transactions",
                color: "bg-green-100"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className={`p-8 rounded-2xl ${feature.color} backdrop-blur-sm bg-opacity-50 hover:bg-opacity-70 transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-white shadow-lg mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-24 px-4 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-gray-800"
          >
            Success Stories
          </motion.h2>
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <blockquote className="text-2xl italic text-gray-600 mb-4">
              "IntelliTrade has transformed the way we manage our IP assets."
            </blockquote>
            <p className="text-lg font-semibold text-gray-800">
              – Happy Innovator
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;