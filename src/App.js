//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/admin-login';
import NoPage from './pages/NoPage';
import Header from './components/header';
import EmployerDashboard  from './pages/employer-dashboard';
import AdminSignup  from './pages/admin-signup';
import EmployerOrganizations from './pages/employer-orgainizations';
import EmployeeSignup from './pages/register-employee';
import OrganizationDashboard  from './pages/organization-dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="organization/dashboard/:Id/:name/" element={<OrganizationDashboard />} />
      <Route path="/employee-signup/:invitation_code/" element={<EmployeeSignup />} />
      <Route path="organizations/" element={<EmployerOrganizations />} />
      <Route path="organization/signup/" element={<AdminSignup />} />
      <Route path="header" element={<Header />} />
      <Route path="employer-dashboard" element={<EmployerDashboard  />} />
      <Route path="*" element={<NoPage />} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
