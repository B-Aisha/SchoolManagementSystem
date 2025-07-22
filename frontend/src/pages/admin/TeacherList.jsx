import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://localhost:7260/api/admin/users-in-role/Teacher',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          All Teachers
        </h2>

        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '250px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />

        
          <Link
            to="/admin/add-teacher"
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>+ Add Teacher
          </Link>
        </div>

        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Edit</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id}>
                <td style={tdStyle}>{teacher.id}</td>
                <td style={tdStyle}>{teacher.userName}</td>
                <td style={tdStyle}>{teacher.email}</td>
                <td style={tdStyle}>{teacher.phoneNumber}</td>
                <td style={tdStyle}>
                  <Link
                    to={`/admin/edit-teacher/${teacher.id}`}
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
                    to={`/admin/delete-teacher/${teacher.id}`}
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

export default TeacherList;
