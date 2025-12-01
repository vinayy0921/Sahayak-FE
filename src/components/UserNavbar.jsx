// src/components/UserNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow-sm">
      <Link className="navbar-brand fw-bold" to="/dashboard">
        Local<span className="text-warning">Serve</span>
      </Link>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/dashboard">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/search">Find Service</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/my-bookings">My Bookings</Link>
          </li>
          
          {/* Profile Dropdown */}
          <li className="nav-item dropdown ms-3">
            <a className="nav-link dropdown-toggle bg-white text-primary rounded-pill px-3 fw-bold" href="/" role="button" data-bs-toggle="dropdown">
              {user.name}
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/user/profile">Edit Profile</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;