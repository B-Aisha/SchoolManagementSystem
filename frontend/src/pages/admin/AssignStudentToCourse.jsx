import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AssignStudentToCourse = () => {
  const { courseId } = useParams(); // Get course ID from URL
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

  useEffect(() => {
  const fetchEnrolled = async () => {
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
      setEnrolledStudents(response.data);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  fetchEnrolled();
}, [courseId]);


  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://localhost:7260/api/course/assign-course',
        {
          courseId,
          studentId: selectedStudentId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Student assigned to course!');
      //navigate('/admin/courses');
    } catch (error) {
      console.error('Error assigning student:', error);
      alert('Assignment failed.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '40px' }}>
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
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Assign
        </button>
      </form>

      <hr style={{ margin: '40px 0' }} />
      <h3>Students Enrolled in This Course</h3>
      {enrolledStudents.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <ul>
          {enrolledStudents.map((student) => (
            <li key={student.studentId}>
              {student.applicationUser?.firstName} {student.applicationUser?.lastName} ({student.applicationUser?.email})
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default AssignStudentToCourse;
