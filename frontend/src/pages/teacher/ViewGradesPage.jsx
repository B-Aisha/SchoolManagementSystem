import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewGradesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCourseId = location.state?.courseId || '';
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [grades, setGrades] = useState([]);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.courseId ? '✅ Grades submitted successfully!' : ''
  );

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/teacher/courses/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchGrades = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');

      try {
        const response = await axios.get(
          `https://localhost:7260/api/grade/teacher/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const filtered = response.data.filter(
          (grade) => grade.courseId === selectedCourseId
        );
        setGrades(filtered);
      } catch (error) {
        console.error('Failed to fetch grades', error);
      }
    };

    fetchGrades();
  }, [selectedCourseId]);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
        📊 Grade Records
      </h2>

      {successMessage && (
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #c3e6cb'
          }}
        >
          {successMessage}
        </div>
      )}

      <div
        style={{
          marginBottom: '30px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <label style={{ fontWeight: 'bold', fontSize: '16px' }}>
          Select Course:
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            marginLeft: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value=''>-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {!selectedCourseId && (
        <div
          style={{ textAlign: 'center', paddingTop: '40px', color: '#777' }}
        >
          <p>Please select a course to view student grades.</p>
        </div>
      )}

      {grades.length > 0 && (
        <table
          className="custom-table"
          style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}
        >
          <thead style={{ backgroundColor: '#007bff', color: 'black' }}>
            <tr>
              <th style={thStyle}>Admission No</th>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>CAT Marks</th>
              <th style={thStyle}>Exam Marks</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td style={tdStyle}>{grade.admNo}</td>
                <td style={tdStyle}>{grade.fullName}</td>
                <td style={tdStyle}>{grade.catMarks}</td>
                <td style={tdStyle}>{grade.examMarks}</td>
                <td style={tdStyle}>{grade.total}</td>
                <td style={tdStyle}>{grade.gradeLetter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCourseId && grades.length === 0 && (
        <p
          style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}
        >
          No grades recorded yet for this course.
        </p>
      )}

      <div style={{ marginTop: '40px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => navigate('/teacher-dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>

        <button
          onClick={() =>
            navigate('/teacher/assign-grades', {
              state: {
                courseId: selectedCourseId,
                courseTitle:
                  courses.find((c) => c.courseId === selectedCourseId)?.title || ''
              }
            })
          }
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          disabled={!selectedCourseId}
        >
          ➕ Assign Grades
        </button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '12px 10px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd'
};

const tdStyle = {
  padding: '10px 10px',
  borderBottom: '1px solid #eee'
};

export default ViewGradesPage;
