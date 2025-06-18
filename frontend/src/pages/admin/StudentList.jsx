import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://localhost:7260/api/admin/users-in-role/Student',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          All Students
        </h2>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Click to Edit</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={tdStyle}>{student.id}</td>
                <td style={tdStyle}>{student.userName}</td>
                <td style={tdStyle}>{student.email}</td>
                <td style={tdStyle}>{student.phoneNumber}</td>
                <td style={tdStyle}>
                  <Link 
                    to={`/admin/edit-student/${student.id}`} 
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}>Edit</Link>
                </td>
                <td style={tdStyle}>
                  <Link 
                    to={`/admin/delete-student/${student.id}`} 
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
       </table>

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
</div>

    
  );
};

const thStyle = {
  padding: '12px',
  border: '1px solid #ccc',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '12px',
  border: '1px solid #ccc',
};

export default StudentList;
