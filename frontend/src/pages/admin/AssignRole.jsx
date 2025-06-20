import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [availableRoles] = useState(['Admin', 'Teacher', 'Student', 'Parent']);

  useEffect(() => {
    // Optional: fetch user's current roles
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://localhost:7260/api/admin/assign-role`, 
        { userId: id, role }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/admin/all-users');
    } catch (err) {
      console.error('Error assigning role:', err);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Assign Role</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Role:</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        >
          <option value="">-- Select Role --</option>
          {availableRoles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <button 
          type="submit" 
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default AssignRole;
