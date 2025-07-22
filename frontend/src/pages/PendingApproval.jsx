// src/pages/PendingApproval.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container" style={{ textAlign: 'center' }}>
      <h2 style={{ color: '#FFA500' }}>⏳ Account Pending Approval</h2>
      <p style={{ marginTop: '20px', fontSize: '16px' }}>
        Your account has been created successfully, but a role has not been assigned yet.
        Please contact the administrator to activate your access.
      </p>
      <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
  For assistance, email <a href="mailto:admin@example.com">admin@example.com</a>
</p>


      <button 
        className="button"
        style={{ marginTop: '30px' }}
        onClick={() => navigate('/')}
      >
        Back to Homepage
      </button>
    </div>
  );
};


export default PendingApproval;
