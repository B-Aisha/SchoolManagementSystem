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
import AssignStudentToCourse  from './pages/admin/AssignStudentToCourse';
import StudentCoursesPage from './pages/student/StudentCoursesPage';
import TeacherCoursesPage from './pages/teacher/TeacherCoursesPage';
import TeacherCourseStudents from './pages/teacher/TeacherCourseStudents';
import MarkAttendance from './pages/teacher/MarkAttendance';
import ViewAttendance from './pages/teacher/ViewAttendance';
import EditAttendance from './pages/teacher/EditAttendance';
import StudentAttendancePage from './pages/student/StudentAttendancePage';
import AssignGradesPage from './pages/teacher/AssignGradesPage';
import ViewGradesPage from './pages/teacher/ViewGradesPage';
import StudentViewGrades from './pages/student/StudentViewGrades';
import PendingApproval from './pages/PendingApproval';
import  AssignParentToStudent  from './pages/admin/AssignParentToStudent';
import  ParentStudentList  from './pages/admin/ParentStudentList';

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
      <Route path="/admin/assign-student/:courseId" element={<AssignStudentToCourse />} />
      <Route path="/student/courses" element={<StudentCoursesPage />} />
      <Route path="/teacher-courses" element={<TeacherCoursesPage />} />
      <Route path="/teacher-course-students/:courseId" element={<TeacherCourseStudents />} />
      <Route path="/teacher/attendance/:courseId" element={<MarkAttendance />} />
      <Route path="/teacher/attendance/view/:courseId" element={<ViewAttendance />} />
      <Route path="/teacher/attendance/edit/:courseId/:studentId/:date" element={<EditAttendance />} />
      <Route path="/student/attendance" element={<StudentAttendancePage />} />
      <Route path="/teacher/assign-grades" element={<AssignGradesPage />} />
      <Route path="/teacher/view-grades" element={<ViewGradesPage />} />
      <Route path="/student/grades" element={<StudentViewGrades/>} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      <Route path="/admin/assign-parent" element={<AssignParentToStudent/>} />
      <Route path="/admin/parent-student-list" element={<ParentStudentList />} />



    </Routes>
    
  );
};

export default App;

