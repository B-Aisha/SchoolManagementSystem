import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TeacherCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');

      if (!teacherId) {
        console.error('Teacher ID not found.');
        return;
      }

      try {
        const response = await axios.get(`https://localhost:7260/api/teacher/courses/${teacherId}`, {
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
    navigate('/teacher-dashboard');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>My Courses</h2>

      {courses.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Credits</th>
              <th style={thStyle}>View Students</th>
              <th style={thStyle}>Mark Attendance</th>
              <th style={thStyle}>View Attendance</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{course.title}</td>
                <td style={tdStyle}>{course.credits}</td>
                <td style={tdStyle}>
                  <button 
                  style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => navigate(`/teacher-course-students/${course.courseId}`)}>
                  View Students
                  </button>
                </td>
                <td style={tdStyle}>
                  <Link
                to={`/teacher/attendance/${course.courseId}`}
                style={{
                  backgroundColor: '#ffc107',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }}
              >
                Mark Attendance
              </Link>
                </td>

                <td style={tdStyle}>
                <Link
                  to={`/teacher/attendance/view/${course.courseId}`}
                  style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                  }}
                >
                  View Attendance
                </Link>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses assigned yet.</p>
      )}

      <button onClick={handleBack} style={buttonStyle}>
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
  textAlign: 'left'
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default TeacherCoursesPage;
