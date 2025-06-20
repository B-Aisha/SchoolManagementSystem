import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    setTeacher({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://localhost:7260/api/auth/register', {
        ...teacher,
        role: 'Teacher'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/admin/teacher-list');
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroup}>
          <label>Username:</label>
          <input type="text" name="userName" value={teacher.userName} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label>Email:</label>
          <input type="email" name="email" value={teacher.email} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={teacher.phoneNumber} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={formGroup}>
          <label>Password:</label>
          <input type="password" name="password" value={teacher.password} onChange={handleChange} style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>Add Teacher</button>
      </form>
    </div>
  );
};

const formGroup = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  padding: '8px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default AddStudent;
