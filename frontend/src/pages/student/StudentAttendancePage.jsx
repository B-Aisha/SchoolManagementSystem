import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const studentId = localStorage.getItem('studentId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/attendance/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setAttendance(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    };

    fetchAttendance();
  }, [studentId]);

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>My Attendance Records</h2>

      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.attendanceId}>
                <td style={tdStyle}>{new Date(record.date).toLocaleDateString()}</td>
                <td style={tdStyle}>{record.courseTitle}</td>
                <td style={tdStyle}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default StudentAttendancePage;
