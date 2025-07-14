import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAttendance = () => {
  const { courseId, studentId, date } = useParams();
  const [record, setRecord] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/attendance/view/${courseId}/${date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const target = response.data.find((r) => r.studentId === studentId);
        setRecord(target);
        setNewStatus(target?.status || '');
      } catch (error) {
        console.error('Error fetching attendance:', error);
        alert('Could not load record.');
      }
    };

    fetchRecord();
  }, [courseId, studentId, date]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const payload = [{
        studentId,
        courseId,
        date,
        status: newStatus
      }];

      await axios.post('https://localhost:7260/api/attendance/mark-attendance', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Attendance updated successfully!');
      navigate(`/teacher/attendance/view/${courseId}`);
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update.');
    }
  };

  if (!record) return <p>Loading...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Update Attendance</h2>
      <p><strong>Student:</strong> {record.fullName} ({record.admNo})</p>
      <p><strong>Date:</strong> {date}</p>

      <label>Status:</label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        style={{ display: 'block', padding: '8px', marginTop: '10px', marginBottom: '20px' }}
      >
        <option value="">-- Select Status --</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>

      <button
        onClick={handleUpdate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditAttendance;
