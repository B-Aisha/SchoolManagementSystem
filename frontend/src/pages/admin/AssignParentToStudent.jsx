// src/pages/admin/AssignParentToStudent.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css'; // ✅ Ensure this path is correct

const AssignParentToStudent = () => {
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedParent, setSelectedParent] = useState('');
  const [message, setMessage] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [parentSearch, setParentSearch] = useState('');

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

  const filteredStudents = students.filter(
    (s) =>
      s.userName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredParents = parents.filter(
    (p) =>
      p.userName.toLowerCase().includes(parentSearch.toLowerCase()) ||
      p.email.toLowerCase().includes(parentSearch.toLowerCase())
  );

  return (
    <div style={{ padding: '40px' }}>
      <h2 className="table-heading">Assign Parent to Student</h2>

      <form onSubmit={handleAssign}>
        <div className="table-container" style={{ gap: '40px', flexWrap: 'wrap', flexDirection: 'row' }}>
          {/* Students Table */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '10px' }}>Students</h3>
            <input
              type="text"
              placeholder="Search students..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>UserName</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.studentId}>
                    <td>
                      <input
                        type="radio"
                        name="selectedStudent"
                        value={student.studentId}
                        checked={selectedStudent === student.studentId}
                        onChange={() => setSelectedStudent(student.studentId)}
                      />
                    </td>
                    <td>{student.userName}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Parents Table */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ marginBottom: '10px' }}>Parents</h3>
            <input
              type="text"
              placeholder="Search parents..."
              value={parentSearch}
              onChange={(e) => setParentSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>UserName</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => (
                  <tr key={parent.parentId}>
                    <td>
                      <input
                        type="radio"
                        name="selectedParent"
                        value={parent.parentId}
                        checked={selectedParent === parent.parentId}
                        onChange={() => setSelectedParent(parent.parentId)}
                      />
                    </td>
                    <td>{parent.userName}</td>
                    <td>{parent.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedStudent || !selectedParent}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px 16px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '30px',
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
