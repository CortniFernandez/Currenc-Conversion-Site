import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/Quick-Conversion">
        <p className="nav-item">Quick Conversion</p>
      </Link>
      <Link to="/Table-Exchange">
        <p className="nav-item">Table Exchange</p>
      </Link>
    </nav>
  );
}

export default Nav;