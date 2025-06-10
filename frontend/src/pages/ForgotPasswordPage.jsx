// src/pages/ForgotPasswordPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      <form className="auth-form">
        <input type="email" placeholder="Enter your email" required />
        <button className="button" type="submit">Send Reset Link</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;