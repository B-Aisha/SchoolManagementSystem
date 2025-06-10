// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';

import '../index.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Welcome to Our School Portal</h2>
        <p>
          Efficient. Smart. Secure. Your complete School Management Solution.
        </p> 
        <p>
          Please log in to access your personalized dashboard.
        </p>
      </div>
    </div>

  );
};

export default HomePage;