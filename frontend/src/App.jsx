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
//import AdminHome from './pages/admin/AdminHome';
import StudentList from './pages/admin/StudentList';
import TeacherList from './pages/admin/TeacherList';
//import ProtectedRoute from './components/ProtectedRoute'; // adjust path based on where you place it
import DebugToken from './pages/DebugToken';
import CreateUser from './pages/admin/CreateUser';
import UsersList from './pages/admin/UsersList';
import AssignRole from './pages/admin/AssignRole';
import EditStudent from './pages/admin/EditStudent';
import AddStudent from './pages/admin/AddStudent';
import EditTeacher from './pages/admin/EditTeacher';
import DeleteStudent from './pages/admin/DeleteStudent';
import DeleteTeacher from './pages/admin/DeleteTeacher';
import AddTeacher from './pages/admin/AddTeacher';
import AddCourse from './pages/admin/AddCourse';
import CourseList from './pages/admin/CourseList';
import EditCourse from './pages/admin/EditCourse';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />
      <Route path="/admin/create-user" element={<CreateUser />} />
      <Route path="/admin/all-users" element={<UsersList />} />
      <Route path="/admin/assign-role/:id" element={<AssignRole />} />
      <Route path="/admin/student-list" element={<StudentList />} />
      <Route path="/admin/edit-student/:id" element={<EditStudent />} />
      <Route path="/admin/delete-student/:id" element={<DeleteStudent />} />
      <Route path="/admin/add-student" element={<AddStudent />} />
      <Route path="/admin/teacher-list" element={<TeacherList />} />
      <Route path="/admin/edit-teacher/:id" element={<EditTeacher />} />
      <Route path="/admin/delete-teacher/:id" element={<DeleteTeacher />} />
      <Route path="/admin/add-teacher" element={<AddTeacher />} />
      <Route path="/debug-token" element={<DebugToken />} />
      <Route path="/admin/add-course" element={<AddCourse />} />
      <Route path="/admin/courses" element={<CourseList />} />
      <Route path="/admin/edit-course/:id" element={<EditCourse />} />


    </Routes>
  );
};

export default App;

