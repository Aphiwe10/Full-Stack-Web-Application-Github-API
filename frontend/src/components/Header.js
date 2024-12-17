import React from 'react';
import { Link } from 'react-router-dom';

// Navigation bar component
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          GitHub Explorer
        </Link>
      </div>
    </nav>
  );
}

export default Header;
