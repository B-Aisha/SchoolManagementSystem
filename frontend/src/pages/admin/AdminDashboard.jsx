// AdminDashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../../index.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <h2>Welcome, Admin</h2>
          <p>Manage users, assign roles, and monitor the school system.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
