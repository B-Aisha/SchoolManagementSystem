// src/pages/Admin/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7260/api/users/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Failed to fetch user', err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7260/api/users/${id}`, formData);
      alert('User updated successfully!');
      navigate('/admin/manage-users');
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <AdminNavbar />
        <div className="dashboard-content">
          <h2>Edit User</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
            <button className="button" type="submit">Update User</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
