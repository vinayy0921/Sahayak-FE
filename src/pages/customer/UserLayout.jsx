import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const UserLayout = () => {
  const location = useLocation(); // 2. Get current route

  // 3. Define conditions to hide the Top Navbar
  // We want to hide it ONLY on the search page
  const hideNavbar = location.pathname === '/user/search';

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* 4. Conditionally Render Navbar */}
      {!hideNavbar && <Navbar />}
      
      {/* 5. Adjust padding based on whether Navbar exists */}
      <div className={`${hideNavbar ? 'pt-0' : 'py-0'}`}>
        <Outlet /> 
      </div>

      {/* Bottom Nav usually stays on all user pages */}
      <BottomNav />
    </div>
  );
};

export default UserLayout;