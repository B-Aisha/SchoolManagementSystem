import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import { Link } from 'react-router-dom'; 


const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7260/api/admin/all-users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users', error));
  }, []);

  return (
    <div className="table-container">
  <div>
    <h2 className="table-heading">All Users</h2>
    <table className="custom-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.roles.join(', ')}</td>
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

export default UsersList;
