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
      
        <li><Link to="/admin/all-users">Users</Link></li>
        <li><Link to="/admin/student-list">Student</Link></li>
        <li><Link to="/admin/teacher-list">Teacher</Link></li>
        <li><Link to="/admin/courses">Courses List</Link></li>
        <li><Link to="/admin/assign-course" className="btn btn-primary">Assign Course</Link>
</li>
      </ul>
    </div>
  );
};

export default Sidebar;
