// AdminDashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../../index.css';
import './admin.css';
import { FaUsers, FaUserPlus, FaChartBar, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <h2>Welcome, Admin</h2>
          <p>Select an action below:</p>

          <div className="admin-cards-grid">
            <Link to="/admin/users" className="admin-card">
              <FaUsers size={40} />
              <h3>Manage Users</h3>
            </Link>

            <Link to="/admin/create-user" className="admin-card">
              <FaUserPlus size={40} />
              <h3>Add New User</h3>
            </Link>

            <Link to="/admin/reports" className="admin-card">
              <FaChartBar size={40} />
              <h3>Reports</h3>
            </Link>

            <Link to="/admin/settings" className="admin-card">
              <FaCog size={40} />
              <h3>Settings</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
