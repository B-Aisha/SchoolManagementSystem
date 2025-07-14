import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AssignStudentToCourse = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7260/api/admin/all-students', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const fetchEnrolled = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://localhost:7260/api/course/${courseId}/enrolled-students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolledStudents(response.data);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  useEffect(() => {
    fetchEnrolled();
  }, [courseId]);

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://localhost:7260/api/course/assign-course',
        { courseId, studentId: selectedStudentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Student assigned to course!');
      setSelectedStudentId('');
      fetchEnrolled(); // refresh list
    } catch (error) {
      console.error('Error assigning student:', error);
      alert('Assignment failed.');
    }
  };

  const handleRemove = async (studentId) => {
    const confirm = window.confirm('Are you sure you want to remove this student from the course?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://localhost:7260/api/course/${courseId}/remove-student/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Student removed successfully.');
      fetchEnrolled(); // refresh list
    } catch (error) {
      console.error('Error removing student:', error);
      alert('Failed to remove student.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '40px' }}>
      <h2>Assign Student to Course</h2>
      <form onSubmit={handleAssign}>
        <label>Select Student:</label>
        <select
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '10px', marginBottom: '20px' }}
        >
          <option value="">-- Select a Student --</option>
          {students.map((student) => (
            <option key={student.studentId} value={student.studentId}>
              {student.userName} ({student.email})
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Assign
        </button>
      </form>

      <hr style={{ margin: '40px 0' }} />

      <h3 style={{ marginBottom: '20px' }}>Students Enrolled in This Course</h3>

      {enrolledStudents.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <div className="table-container">
          <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Admission Number</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.admNo || 'N/A'}</td>
                  <td>{student.fullName || 'N/A'}</td>
                  <td>{student.email || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(student.studentId)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={() => navigate('/admin/courses')}
        style={{
          marginTop: '30px',
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

export default AssignStudentToCourse;
