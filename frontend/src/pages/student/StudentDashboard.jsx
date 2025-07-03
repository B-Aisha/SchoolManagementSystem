import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://localhost:7260/api/student/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Failed to fetch student profile:', error);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">School Management System</h1>
        <div>
          <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">Logout</button>
        </div>
      </nav>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 hidden md:block">
          <ul className="space-y-4">
            <li className="font-semibold cursor-pointer">Dashboard</li>
            <li className="cursor-pointer">My Courses</li>
            <li className="cursor-pointer">Grades</li>
            <li className="cursor-pointer">Attendance</li>
          </ul>
        </aside>

        {/* Dashboard */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {student.firstName} {student.lastName}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Total Courses</h3>
              <p className="text-2xl">3</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Recent Grades</h3>
              <p className="text-2xl">A</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Attendance</h3>
              <p className="text-2xl">95%</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
