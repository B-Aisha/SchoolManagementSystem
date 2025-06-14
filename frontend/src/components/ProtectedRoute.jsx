// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return role === allowedRole ? children : <Navigate to="/admin-dashboard" />;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
