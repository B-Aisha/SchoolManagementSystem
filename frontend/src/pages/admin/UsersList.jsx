import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7260/api/admin/all-users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users', error));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <table>
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
    </div>
  );
};

export default UsersList;
