import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://localhost:7260/api/Users/login', formData);
      const { token, role, studentId } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // ✅ Decode token to optionally store user email/name (optional)
      const decoded = jwtDecode(token);
      const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      if (email) {
        localStorage.setItem('userEmail', email);
      }


    if (studentId) {
      localStorage.setItem('studentId', studentId);
    }


      // Navigate based on role
    if (role === 'Admin') navigate('/admin-dashboard');
    else if (role === 'Teacher') navigate('/teacher-dashboard');
    else if (role === 'Student') navigate('/student-dashboard');
    else if (role === 'Parent') navigate('/parent-dashboard');
    else navigate('/');

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