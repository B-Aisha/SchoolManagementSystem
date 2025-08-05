// src/pages/admin/ParentStudentList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css'; // Use your existing table styles
import { Link } from 'react-router-dom';

const ParentStudentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchAssignments = async () => {
      try {
        const res = await axios.get('https://localhost:7260/api/admin/parent-student-assignments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignments(res.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter((item) =>
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px' }}>
      <h2 className="table-heading">Parent-Student Assignments</h2>

     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
  <input
    type="text"
    placeholder="Search by name or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      minWidth: '250px'
    }}
  />

  <Link
    to="/admin/assign-parent"
    style={{
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '4px',
      textDecoration: 'none',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      alignSelf: 'center'
    }}
  >
    + Assign New Parent
  </Link>
</div>


      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Parent Name</th>
              <th>Parent Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((item, index) => (
                <tr key={index}>
                  <td>{item.studentName}</td>
                  <td>{item.studentEmail}</td>
                  <td>{item.parentName}</td>
                  <td>{item.parentEmail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No assignments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <Link
                        to="/admin-dashboard"
                        style={{
                          color: '#007bff',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          border: '1px solid #007bff',
                          padding: '8px 16px',
                          borderRadius: '4px'
                        }}
                      >
                        ← Back to Dashboard
                      </Link>
                    </div> 

    </div>
  );
};

export default ParentStudentList;
