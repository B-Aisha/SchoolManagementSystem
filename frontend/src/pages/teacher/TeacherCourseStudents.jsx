import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherCourseStudents = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`https://localhost:7260/api/teacher/students-in-course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchStudents();
  }, [courseId]);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Students Enrolled in This Course</h2>

      {students.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={headerStyle}>Admission No</th>
              <th style={headerStyle}>Full Name</th>
              <th style={headerStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentId}>
                <td style={cellStyle}>{student.admNo}</td>
                <td style={cellStyle}>{student.fullName}</td>
                <td style={cellStyle}>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students enrolled in this course.</p>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
    </div>
  );
};

const headerStyle = { padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' };
const cellStyle = { padding: '10px', borderBottom: '1px solid #ddd' };

export default TeacherCourseStudents;
