import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentAttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [groupedAttendance, setGroupedAttendance] = useState({});
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
        groupByCourse(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    };

    fetchAttendance();
  }, [studentId]);

  const groupByCourse = (records) => {
    const grouped = records.reduce((acc, record) => {
      if (!acc[record.courseTitle]) acc[record.courseTitle] = [];
      acc[record.courseTitle].push(record);
      return acc;
    }, {});
    setGroupedAttendance(grouped);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>My Attendance Records</h2>

      {Object.keys(groupedAttendance).length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        Object.entries(groupedAttendance).map(([courseTitle, records]) => (
          <div key={courseTitle} style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>{courseTitle}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f2f2f2' }}>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.attendanceId}>
                    <td style={tdStyle}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{record.status}</td>
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

export default StudentAttendancePage;








