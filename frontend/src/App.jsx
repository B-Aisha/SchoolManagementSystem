// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import About from './pages/About';
import LoginPage from "./pages/LoginPage"; 
import SignUpPage from "./pages/SignupPage"
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';
import AdminHome from './pages/admin/AdminHome';
import StudentList from './pages/admin/StudentList';
import TeacherList from './pages/admin/TeacherList';
//import ProtectedRoute from './components/ProtectedRoute'; // adjust path based on where you place it
import DebugToken from './pages/DebugToken';
import CreateUser from './pages/admin/CreateUser';
import UsersList from './pages/admin/UsersList';
import EditStudent from './pages/admin/EditStudent';
import EditTeacher from './pages/admin/EditTeacher';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin" element={<AdminHome />}/>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/admin/create-user" element={<CreateUser />} />
      <Route path="/admin/all-users" element={<UsersList />} />
      <Route path="/admin/student-list" element={<StudentList />} />
      <Route path="/admin/edit-student/:id" element={<EditStudent />} />
      <Route path="/admin/teacher-list" element={<TeacherList />} />
      <Route path="/admin/edit-teacher/:id" element={<EditTeacher />} />
      <Route path="/debug-token" element={<DebugToken />} />
    </Routes>
  );
};

export default App;

