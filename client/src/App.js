import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLogin from './components/userLogin/login';
import UserRegister from './components/userRegister/register';
import MiniDrawer from './components/dashboard';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/dashboard" element={<MiniDrawer />} />
    </Routes>
  );
};

export default App;
