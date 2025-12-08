import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';

const UserLayout = () => {
  const location = useLocation();

  // 1. Hide Top Navbar on Search
  const hideNavbar = location.pathname === '/user/search';

  // 2. Hide Bottom Nav on Provider Details AND Booking Page
  // We use .startsWith() because the ID changes (e.g. /user/provider/123)
  const hideBottomNav = location.pathname.startsWith('/user/provider/') ||
    location.pathname === '/user/book-service' ||
    location.pathname === '/user/saved-addresses'
    ;

  const hideHeader = location.pathname.startsWith('/user/provider/') ||
    location.pathname === '/user/search' ||
    location.pathname === '/user/book-service'
    || location.pathname === '/user/saved-addresses';

  return (
    <div className="bg-light min-vh-100 pb-5">

      {/* Conditionally Render Top Navbar */}
      {!hideHeader && <Navbar />}

      <div className={`${hideNavbar ? 'pt-0' : 'pt-0 mt-0'}`}>
        <Outlet />
      </div>

      {/* Conditionally Render Bottom Nav */}
      {!hideBottomNav && <BottomNav />}

    </div>
  );
};

export default UserLayout;