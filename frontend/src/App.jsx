// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from "./pages/LoginPage"; 
import SignUpPage from "./pages/SignupPage"
import ForgotPasswordPage from './pages/ForgotPasswordPage';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

    </Routes>
  );
};

export default App;

