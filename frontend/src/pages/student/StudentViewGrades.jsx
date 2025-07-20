import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentViewGrades = () => {
  const [grades, setGrades] = useState([]);
  const [groupedGrades, setGroupedGrades] = useState({});
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrades = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/grade/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setGrades(response.data);
        groupByCourse(response.data);
      } catch (error) {
        console.error('Failed to fetch grades:', error);
      }
    };

    fetchGrades();
  }, [studentId]);

  const groupByCourse = (records) => {
    const grouped = records.reduce((acc, record) => {
      if (!acc[record.courseTitle]) acc[record.courseTitle] = [];
      acc[record.courseTitle].push(record);
      return acc;
    }, {});
    setGroupedGrades(grouped);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>My Grades</h2>

      {Object.keys(groupedGrades).length === 0 ? (
        <p>No grade records found.</p>
      ) : (
        Object.entries(groupedGrades).map(([courseTitle, records]) => (
          <div key={courseTitle} style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{courseTitle}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th style={thStyle}>CAT Marks</th>
                  <th style={thStyle}>Exam Marks</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Grade</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{record.catMarks}</td>
                    <td style={tdStyle}>{record.examMarks}</td>
                    <td style={tdStyle}>{record.total}</td>
                    <td style={tdStyle}>{record.gradeLetter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}

      <button
        onClick={() => navigate('/student-dashboard')}
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
        ← Back
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
  borderBottom: '1px solid #ddd'
};

export default StudentViewGrades;
