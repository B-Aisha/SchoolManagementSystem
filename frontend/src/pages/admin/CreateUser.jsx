// src/pages/Admin/UserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import '../../index.css'; // Added CSS import

const CreateUser = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    role: '',
    password: '',
    PhoneNumber: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7260/api/users/register', formData);
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <h2>Add New User</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
            <input type="text" name="firstName" placeholder="Firstname" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Lastname" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phonenumber" placeholder="PhoneNumber" onChange={handleChange} required />
            <input type="text" name="role" placeholder="Role (e.g. Student, Teacher, Parent, Admin)" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button className="button" type="submit">Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
