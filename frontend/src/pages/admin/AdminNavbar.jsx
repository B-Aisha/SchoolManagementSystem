// src/pages/Admin/AdminNavbar.jsx
import React from 'react';
import '../../index.css'; 
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear stored token and role
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };


  return (
    <div className="admin-navbar">
      
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      
    </div>
  );
};

export default AdminNavbar;
