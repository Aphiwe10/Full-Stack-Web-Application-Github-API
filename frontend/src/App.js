import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import UserDetails from './components/UserDetails';

// Main application component
function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          {/* Route for search page */}
          <Route path="/" element={<SearchPage />} />
          {/* Route for user details */}
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
