// src/pages/Admin/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/admin/create-user">Add New User</Link></li>
        <li><Link to="/admin/all-users">List all Users</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
