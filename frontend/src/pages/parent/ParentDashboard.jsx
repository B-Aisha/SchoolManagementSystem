// src/pages/StudentDashboard.jsx
import React from 'react';
import '../../index.css';

const ParentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h1>Welcome, Parent</h1>
      <div className="dashboard-section">
        <h2>Child Profile</h2>
        <p>Name: Aisha Bakari</p>
        <p>Class: Grade 10</p>
      </div>

      <div className="dashboard-section">
        <h2>Grades</h2>
        <ul>
          <li>Mathematics: A</li>
          <li>English: B</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Attendance</h2>
        <ul>
          <li>Present: 85 days</li>
          <li>Absent: 5 days</li>
        </ul>
      </div>
    </div>
  );
};

export default ParentDashboard;
