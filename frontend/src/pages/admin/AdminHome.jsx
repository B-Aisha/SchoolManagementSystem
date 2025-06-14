import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../../index.css';

const AdminHome = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <Outlet /> {/* This renders the nested child routes like dashboard, users, etc */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
