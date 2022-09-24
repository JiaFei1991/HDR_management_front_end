import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SchedulePage from './pages/Schedule';

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/home" element={<HomePage />}>
        {/* <Route index element={<HomePage />} /> */}
        <Route path="schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
};

export default App;
