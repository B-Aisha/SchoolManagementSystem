import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewAttendance = () => {
  const { courseId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const fetchAttendance = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `https://localhost:7260/api/attendance/view/${courseId}/${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      alert('Could not fetch attendance records.');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Attendance Records for {date}</h2>

      <label>Select Date: </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: '20px', padding: '6px' }}
      />

      {attendanceRecords.length === 0 ? (
        <p>No attendance records found for this date.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Adm No</th>
              <th>Full Name</th>
              <th>Status</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
  {attendanceRecords.map((record, index) => (
    <tr key={index}>
      <td>{record.admNo}</td>
      <td>{record.fullName}</td>
      <td>{record.status}</td>
      <td>
        <Link
          to={`/teacher/attendance/edit/${courseId}/${record.studentId}/${date}`}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Update
        </Link>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}

      <button
        onClick={() => navigate('/teacher-courses')}
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
        ← Back to My Courses
        </button>
    </div>
  );
};

export default ViewAttendance;
