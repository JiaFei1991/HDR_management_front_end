import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SchedulePage from './pages/Schedule';
import StudentPage from './pages/Student';
import SessionPage from './pages/Session';
import ProjectPage from './pages/Project';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/home" element={<HomePage />}>
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="session" element={<SessionPage />} />
        <Route path="project" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
};

export default App;
