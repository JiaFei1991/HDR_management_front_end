import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';

class App extends React.Component {
  render() {
    return (
      // <div className="app-container">
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
      // </div>
    );
  }
}

export default App;
