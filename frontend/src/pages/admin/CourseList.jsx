import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css'; // reuse your existing table styles
import { Link } from 'react-router-dom'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7260/api/course/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="table-container">
      <div>
        <h2 className="table-heading">All Courses</h2>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Teacher ID</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.title}</td>
                <td>{course.credits}</td>
                <td>{course.teacherId || 'N/A'}</td>
                <td><Link
                to={`/admin/edit-course/${course.courseId}`}
                style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                textDecoration: 'none'
                }}>Edit </Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a
            href="/admin-dashboard"
            style={{
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '1px solid #007bff',
              padding: '8px 16px',
              borderRadius: '4px'
            }}
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
