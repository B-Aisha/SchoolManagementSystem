import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    userName: '',
    FirstName:'',
    LastName:'',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7260/api/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://localhost:7260/api/admin/user/${id}`, student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/student-list');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Edit Student</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="userName"
          value={student.userName}
          onChange={handleChange}
          placeholder="Username"
          style={inputStyle}
        /> 
        <input
          name="FirstName"
          value={student.FirstName}
          onChange={handleChange}
          placeholder="Firstname"
          style={inputStyle}
        />
         <input
          name="LastName"
          value={student.LastName}
          onChange={handleChange}
          placeholder="Lastname"
          style={inputStyle}
        />
        <input
          name="email"
          value={student.email}
          onChange={handleChange}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          name="phoneNumber"
          value={student.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Update</button>
      </form>
    </div>
  );
};

// Inline styles
const containerStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  backgroundColor: '#f9f9f9',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default EditStudent;
