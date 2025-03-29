// frontend/src/pages/Admin.jsx
import React from 'react';

const Admin = () => {
  // Dummy admin data for demonstration
  const adminData = {
    totalUsers: 120,
    totalAssets: 50,
    pendingVerifications: 5,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <section className="mb-4">
        <h2 className="text-2xl">Dashboard Overview</h2>
        <ul className="list-disc ml-6">
          <li>Total Users: {adminData.totalUsers}</li>
          <li>Total IP Assets: {adminData.totalAssets}</li>
          <li>Pending Verifications: {adminData.pendingVerifications}</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl">Manage Users and Assets</h2>
        <p>
          Here you can manage users and IP assets. (Functionality to be implemented.)
        </p>
      </section>
    </div>
  );
};

export default Admin;
