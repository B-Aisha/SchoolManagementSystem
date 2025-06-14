// src/pages/About.jsx
import React from 'react';
import '../index.css'; // Adjust if you use a different styling path

const About = () => {
  return (
    <div className="about-page" style={{ padding: '2rem' }}>
      <h1>About Our School Management System</h1>
      <p style={{ maxWidth: '800px', lineHeight: '1.6', marginTop: '1rem' }}>
        Our School Management System is designed to streamline the academic and administrative processes of our institution.
        It helps administrators manage users, teachers track student performance, parents stay updated on their children's progress,
        and students stay informed about their classes and grades.
      </p>

      <h2 style={{ marginTop: '2rem' }}>Key Features:</h2>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Secure user authentication and role-based access.</li>
        <li>Course management for teachers and students.</li>
        <li>Student attendance and grade tracking.</li>
        <li>Parent access to performance and attendance reports.</li>
        <li>Modern, responsive user interface.</li>
      </ul>

      <h2 style={{ marginTop: '2rem' }}>Our Mission</h2>
      <p style={{ maxWidth: '800px', lineHeight: '1.6' }}>
        We aim to foster effective communication and academic excellence by using technology to connect students, teachers,
        parents, and administrators in one centralized system.
      </p>
    </div>
  );
};

export default About;
