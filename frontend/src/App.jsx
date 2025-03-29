// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Importing context providers
import { AuthProvider } from './contexts/AuthContext';
import { Web3Provider } from './contexts/Web3Context';
import { MarketplaceProvider } from './contexts/MarketplaceContext';


// Importing pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import UploadIP from './pages/UploadIP';
// import AssetDetail from './pages/AssetDetail';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Importing common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ManageAssets from './pages/ManageAssets';
import ListAssetForSale from './pages/ListAssetForSale';
import RemoveAssetFromSale from './pages/RemoveAssetFromSale';
import OwnedAssets from './pages/OwnedAssets';
import AssetDetails from './pages/AssetDetails';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Web3Provider>
          <MarketplaceProvider>
            {/* Header will be visible on every page */}
            <ToastContainer />
            <Header />

            {/* Main routes for the application */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/upload-ip" element={<UploadIP />} />
              {/* <Route path="/asset/:id" element={<AssetDetail />} /> */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/assets" element={<ManageAssets />} />
              <Route path="/list-asset-for-sale" element={<ListAssetForSale />} />
              <Route path="/remove-asset-from-sale" element={<RemoveAssetFromSale />} />
              <Route path="/owned-assets" element={<OwnedAssets />} />
              <Route path="/asset-details" element={<AssetDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

            {/* Footer will be visible on every page */}
            <Footer />
          </MarketplaceProvider>
        </Web3Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
