// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '15px', color: 'white' }}>Dashboard</Link>
      <Link to="/students" style={{ marginRight: '15px', color: 'white' }}>Students</Link>
      <Link to="/teachers" style={{ color: 'white' }}>Teachers</Link>
    </nav>
  );
}

export default Navbar;
