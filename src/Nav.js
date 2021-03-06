import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="navbar">
      <div className="d-flex flex-grow-1">
      <h6 className="navbar-brand d-none d-lg-flex">Currency Conversion App with React</h6>
      </div>
      <div className="page-links">
        <Link to="/Quick-Conversion">
          <p className="nav-item">Quick Conversion</p>
        </Link>
        <Link to="/Table-Exchange-Rates">
          <p className="nav-item">Table Exchange Rates</p>
        </Link>
      </div>
    </div>
  );
}

export default Nav;