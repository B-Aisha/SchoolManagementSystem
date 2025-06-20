// AdminDashboard.jsx
import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../../index.css';
import './admin.css';
import { FaUsers,  FaChalkboardTeacher, FaUserGraduate} from 'react-icons/fa';
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
            <Link to="/admin/all-users" className="admin-card">
              <FaUsers size={40} />
              <h3>Manage Users</h3>
            </Link>

            <Link to="/admin/teacher-list" className="admin-card">
              <FaChalkboardTeacher size={40} />
              <h3>Teacher</h3>
            </Link>
            <Link to="/admin/student-list" className="admin-card">
              <FaUserGraduate size={40} />
              <h3>Students</h3>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
