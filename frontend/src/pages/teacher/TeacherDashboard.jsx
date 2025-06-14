// src/pages/TeacherDashboard.jsx
import React from 'react';
import '../../index.css';
const TeacherDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h1>Welcome, Teacher</h1>
      <div className="dashboard-section">
        <h2>Courses Allocated</h2>
        <ul>
          <li>Mathematics 101</li>
          <li>Physics 202</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Students Enrolled</h2>
        <ul>
          <li>Jane Doe (Math 101)</li>
          <li>John Smith (Physics 202)</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Record Attendance</h2>
        <p>Attendance recording UI coming soon...</p>
      </div>

      <div className="dashboard-section">
        <h2>Record Grades</h2>
        <p>Grades recording UI coming soon...</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
