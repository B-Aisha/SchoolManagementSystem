// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Password: '',
    Role: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7260/api/Users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      setMessage(text);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form className="auth-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="UserName"
          placeholder="User Name"
          value={formData.UserName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={formData.FirstName}
          onChange={handleChange}
          required
        />
         <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={formData.LastName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="PhoneNumber"
          placeholder="Phone Number"
          value={formData.PhoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          required
        />
        
        <select
          name="Role"
          value={formData.Role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Parent">Parent</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="button" type="submit">Sign Up</button>
      </form>

      <p>{message}</p>

      <div className="auth-links">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
