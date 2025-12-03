import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/BottomNav.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav-dock">
      
      {/* 1. Home */}
      <NavLink 
        to="/user/home" 
        className="nav-dock-item" 
        data-label="Home"
      >
        <i className="bi bi-house-door-fill"></i>
      </NavLink>

      {/* 2. Search */}
      <NavLink 
        to="/user/search" 
        className="nav-dock-item" 
        data-label="Explore"
      >
        <i className="bi bi-search"></i>
      </NavLink>

      {/* 3. My Bookings */}
      <NavLink 
        to="/user/my-bookings" 
        className="nav-dock-item" 
        data-label="Bookings"
      >
        <i className="bi bi-calendar-check-fill"></i>
      </NavLink>

      {/* 4. Profile */}
      <NavLink 
        to="/user/profile" 
        className="nav-dock-item" 
        data-label="Profile"
      >
        <i className="bi bi-person-circle"></i>
      </NavLink>

    </div>
  );
};

export default BottomNav;