import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const DebugToken = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found in localStorage.");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);

      const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("User role:", roleClaim);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, []);

  return (
    <div>
      <h2>Check the browser console for token details</h2>
    </div>
  );
};

export default DebugToken;
