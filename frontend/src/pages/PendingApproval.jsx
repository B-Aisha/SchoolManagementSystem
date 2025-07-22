// src/pages/PendingApproval.jsx
import React from 'react';

const PendingApproval = () => {
  return (
    <div className="auth-container">
      <h2>Account Pending Approval</h2>
      <p>
        Your account has been created but has not been assigned a role yet.
        Please contact the administrator to activate your access.
      </p>
    </div>
  );
};

export default PendingApproval;
