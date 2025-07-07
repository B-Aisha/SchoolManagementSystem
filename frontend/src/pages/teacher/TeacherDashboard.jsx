import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './teacherDashboard.css';
import { getUserFromToken } from '../../utils/auth';


const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState({ fullName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');  // 👈 Get teacherId from localStorage

      if (!teacherId) {
        console.error('Teacher ID not found.');
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7260/api/teacher/profile/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeacher(response.data);//set the entire profile and not just the ID
      } catch (error) {
        console.error('Failed to fetch teacher profile:', error);
        
      }
    };

    fetchTeacherProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherId');  // 👈 Clear teacherId too
    navigate('/login');
  };

  return (
    <div className="teacher-dashboard-container">
      <nav className="teacher-navbar">
        <h1 className="teacher-navbar-title">School Management System</h1>
        <button className="teacher-logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="teacher-main-content">
        <aside className="teacher-sidebar">
          <ul className="teacher-sidebar-list">
            <li className="teacher-sidebar-item">Dashboard</li>
            <li className="teacher-sidebar-item">My Courses</li>
            <li className="teacher-sidebar-item">Grades</li>
            <li className="teacher-sidebar-item">Attendance</li>
          </ul>
        </aside>

        <main className="teacher-dashboard">
          <h2 className="teacher-welcome-text">Welcome, {teacher.fullName}</h2>

          <div className="teacher-cards-container">
            <div className="teacher-card">
              <h3>Total Courses</h3>
              <p className="teacher-card-number">3</p>
            </div>

            <div className="teacher-card">
              <h3>Assign Grades</h3>
              <p className="teacher-card-number">A</p>
            </div>

            <div className="teacher-card">
              <h3>Attendance</h3>
              <p className="teacher-card-number">95%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
