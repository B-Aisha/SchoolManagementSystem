import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import { Link } from 'react-router-dom'; 

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7260/api/admin/all-users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users', error));
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div>
      <h2 className="table-heading">All Users</h2>

      {/* Search Bar */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '250px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />

        <Link
          to="/admin/create-user"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          + Add User
        </Link>
      </div>

      {/* Table */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Roles</th>
            <th>Assign Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <Link
                  to={`/admin/assign-role/${user.id}`}
                  style={{
                    backgroundColor: '#ffc107',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Assign Role
                </Link>
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

export default UsersList;
