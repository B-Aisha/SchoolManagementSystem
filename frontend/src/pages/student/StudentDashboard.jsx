// src/pages/StudentDashboard.jsx
import React from 'react';
import '../../index.css';

const StudentDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <h1>Welcome, Student</h1>
      <div className="dashboard-section">
        <h2>Profile</h2>
        <p>Name: Jane Doe</p>
        <p>Student ID: 123456</p>
      </div>

      <div className="dashboard-section">
        <h2>Enrolled Courses</h2>
        <ul>
          <li>Mathematics</li>
          <li>English Literature</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Available Courses</h2>
        <ul>
          <li>Biology</li>
          <li>Computer Science</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Grades</h2>
        <ul>
          <li>Mathematics: A</li>
          <li>English Literature: B+</li>
        </ul>
      </div>
    </div>
  );
};
export default StudentDashboard;
