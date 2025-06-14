// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../index.css';
import About from '../pages/About';
import { Link } from 'react-router-dom';

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

        {/* Summary of About Section */}
        <div className="about-summary" style={{ marginTop: '3rem' }}>
          <h3>About Us</h3>
          <p>
            We are dedicated to streamlining school operations for administrators,
            teachers, parents, and students. Our portal provides easy access to attendance,
            grades, course management, and more.
          </p>
          <Link to="/about" className="button">Learn More →</Link>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
