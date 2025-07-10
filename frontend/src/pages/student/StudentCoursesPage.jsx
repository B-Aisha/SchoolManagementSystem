import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';  // You can reuse styles

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const studentId = localStorage.getItem('studentId');

      if (!studentId) {
        console.error('Student ID not found.');
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7260/api/student/courses/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleBack = () => {
    navigate('/student-dashboard');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>My Enrolled Courses</h2>

      {courses.length > 0 ? ( <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Course Title</th>
              <th style={thStyle}>Credits</th>
              <th style={thStyle}>Teacher</th>
              
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{course.title}</td>
                <td style={tdStyle}>{course.credits}</td>
                <td style={tdStyle}>{course.teacherName || 'N/A'}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}

      <button
        onClick={handleBack}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

const thStyle = {
  padding: '12px 8px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '10px 8px',
  textAlign: 'left',
};

export default StudentCoursesPage;
