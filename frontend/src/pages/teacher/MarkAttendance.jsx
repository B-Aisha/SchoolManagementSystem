import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MarkAttendance = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // today's date

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/course/${courseId}/enrolled-students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };

    fetchStudents();
  }, [courseId]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const payload = students.map((student) => ({
        studentId: student.studentId,
        courseId,
        status: attendance[student.studentId] || 'Absent',
        date,
      }));

      await axios.post('https://localhost:7260/api/attendance/mark-attendance', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance:', error);
      alert('Failed to submit attendance.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mark Attendance for {date}</h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Admission No</th>
            <th>Full Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.admNo}</td>
              <td>{student.fullName}</td>
              <td>
                <select
                  value={attendance[student.studentId] || ''}
                  onChange={(e) =>
                    handleAttendanceChange(student.studentId, e.target.value)
                  }
                >
                  <option value="">-- Select Status --</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;
