import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://localhost:7260/api/Users/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);//store token since we're using JWT
      setSuccess('Login successful!');
      // Redirect or navigate to dashboard here
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form  className="auth-form" onSubmit={handleSubmit}>
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
        <button className="button" type="submit">Log In</button>
      </form>
      <div className="auth-links">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div> 
    </div>
  );
};

export default Login;