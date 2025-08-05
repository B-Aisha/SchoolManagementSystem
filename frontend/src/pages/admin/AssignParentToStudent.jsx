import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignParentToStudent = () => {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedParent, setSelectedParent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
      try {
        const [studentRes, parentRes] = await Promise.all([
          axios.get('https://localhost:7260/api/admin/all-students', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://localhost:7260/api/admin/all-parents', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setStudents(studentRes.data);
        setParents(parentRes.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://localhost:7260/api/admin/assign-parent', {
        studentId: selectedStudent,
        parentId: selectedParent
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('✅ Parent successfully assigned to student.');
    } catch (error) {
      console.error('Assignment failed:', error);
      setMessage('❌ Failed to assign parent.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Assign Parent to Student</h2>

      <form onSubmit={handleAssign}>
        <div style={{ marginBottom: '20px' }}>
          <label>Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Select Student --</option>
           {students.map((student) => (
          <option key={student.studentId} value={student.studentId}>
            {student.userName} - {student.email}
          </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Parent:</label>
          <select
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">-- Select Parent --</option>
            {parents.map((parent) => (
          <option key={parent.parentId} value={parent.parentId}>
            {parent.userName} - {parent.email}
          </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          Assign Parent
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', color: message.includes('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AssignParentToStudent;
