//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/admin-login';
import EmployeeLogin from './pages/employee-login';
import NoPage from './pages/NoPage';
import Header from './components/header';
import EmployerDashboard  from './pages/employer-dashboard';
import AdminSignup  from './pages/admin-signup';
import EmployerOrganizations from './pages/employer-orgainizations';
import EmployeeSignup from './pages/register-employee';
import OrganizationDashboard  from './pages/organization-dashboard';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeOrganizationDashboard from './pages/employee-organization-dashboard';
import InstructorSignup from './pages/instructor-signup';
import InstructorLogin from './pages/instructor-login';
import InstructorDashboard from './pages/instructor-dashboard';
import CreateCourse from './pages/create-course';
import Requirements from './pages/course-requirements';
import CourseSections from './pages/course-sections';
import Objectives from './pages/course-objectives';
import CourseEdit from './pages/course-edit';
import Elearning from './pages/elearning';
import Search from './pages/search';
import CourseDetailPage from './pages/course-detail';
import CourseViewPage from './pages/course-view-page';
import OrganizationCourses from './pages/organization-courses';
import EmployeeCourses from './pages/employee-courses';
import CreateInstructorProfile from './pages/instructor-profile-create';
import InstructorProfile from './pages/instructor-profile';
import EditInstructorProfile from './pages/instructor-profile-edit';
import CreateEmployeeProfile  from './pages/employee-profile-create';
import EmployeeProfile from './pages/employee-profile';
import EditEmployeeProfile from './pages/employee-profile-edit';
import CreateEmployerProfile from './pages/employer-profile-create';
import EmployerProfile from './pages/employer-profile';
import EditEmployerProfile from './pages/employer-profile-edit';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="employer/profile/edit/" element={<EditEmployerProfile />} />
      <Route path="employer/profile/" element={<EmployerProfile />} />
      <Route path="employer/profile/create/" element={<CreateEmployerProfile />} />
      <Route path="employee/profile/edit/" element={<EditEmployeeProfile />} />
      <Route path="employee/profile/" element={<EmployeeProfile />} />
      <Route path="employee/profile/create/" element={<CreateEmployeeProfile />} />
      <Route path="instructor/profile/" element={<InstructorProfile />} />
      <Route path="instructor/profile/create/" element={<CreateInstructorProfile />} />
      <Route path="instructor/profile/edit/" element={<EditInstructorProfile />} />
      <Route path="course-detail/:id/:title/" element={<CourseDetailPage />} />
      <Route path="organization/courses/" element={<OrganizationCourses />} />
      <Route path="employee/courses/" element={<EmployeeCourses />} />
      <Route path="course-view-page/:id/:title/" element={<CourseViewPage />} />
      <Route path="elearning/" element={<Elearning />} />
      <Route path="courses/add-objectives/:id/:title/" element={<Objectives />} />
      <Route path="courses/add-requirement/:id/:title/" element={<Requirements />} />
      <Route path="instructor/dashboard/" element={<InstructorDashboard   />} />
      <Route path="course-sections/:id/:title/" element={<CourseSections />} />
      <Route path="course/:id/edit/" element={<CourseEdit />} />
      <Route path="search" element={<Search />} />
      <Route path="instructor/courses/create/" element={<CreateCourse />} />
      <Route path="employee/dashboard/" element={<EmployeeDashboard   />} />
      <Route path="instructor/login/" element={<InstructorLogin />} />
      <Route path="instructor/signup/" element={<InstructorSignup />} />
      <Route path="employee/organization/dashboard/:Id/:name/" element={<EmployeeOrganizationDashboard  />} />
      <Route path="employee/login/" element={<EmployeeLogin />} />
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
