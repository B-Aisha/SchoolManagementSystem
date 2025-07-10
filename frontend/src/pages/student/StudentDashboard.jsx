import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentDashboard.css';
import { getUserFromToken } from '../../utils/auth';


const StudentDashboard = () => {
  const [student, setStudent] = useState({ fullName: '', email: '', admNo: '' });
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    const fetchStudentProfile = async () => {
      const token = localStorage.getItem('token');
      const studentId = localStorage.getItem('studentId');  // Get studentId from localStorage

      if (!studentId) {
        console.error('Student ID not found.');
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7260/api/student/profile/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(response.data);//set the entire profile and not just the ID

         // Fetch enrolled courses
      const coursesResponse = await axios.get(`https://localhost:7260/api/student/courses/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(coursesResponse.data);

      } catch (error) {
        console.error('Failed to fetch student profile or courses:', error);
        
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');  // Clear studentId too
    navigate('/login');
  };

  return (
    <div className="student-dashboard-container">
      <nav className="student-navbar">
        <h1 className="student-navbar-title">School Management System</h1>
        <button className="student-logout-button" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="student-main-content">
        <aside className="student-sidebar">
          <ul className="student-sidebar-list">
            <li className="student-sidebar-item">Dashboard</li>
            <li className="student-sidebar-item">My Courses</li>
            <li className="student-sidebar-item">Grades</li>
            <li className="student-sidebar-item">Attendance</li>
          </ul>
        </aside>

        <main className="student-dashboard">
          <h2 className="student-welcome-text">Welcome, {student.fullName}</h2>



          <div className="student-cards-container">
            <div className="student-card"
             onClick={() => navigate('/student/courses')}>
             
              <h3>Total Courses</h3>
              <p className="student-card-number">{courses.length}</p>
            </div>

            <div className="student-card">
              <h3>Recent Grades</h3>
              <p className="student-card-number">A</p>
            </div>

            <div className="student-card">
              <h3>Attendance</h3>
              <p className="student-card-number">95%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
