// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate('/login'); // enable later when login page exists
  };

  return (
    <nav className="navbar">
      <h1>School Management System</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="#">Contact</a>
        <button className="button" onClick={handleLogin}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
