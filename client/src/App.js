
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './components/userLogin/login';
import UserRegister from './components/userRegister/register';
import MiniDrawer from './components/dashboard';

const App = () => {
  // Check for authorization (token in localStorage)
  const isAuthenticated = localStorage.getItem('authorization'); // Replace 'authToken' with the key used in your app
  console.log("isAuthe>>>", isAuthenticated)
  return (
    <Routes>
      <Route path="/" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />

      {/* Redirect to login if not authenticated */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <MiniDrawer /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;

