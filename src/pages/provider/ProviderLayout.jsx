import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProviderBottomNav from '../../components/ProviderBottomNav';

const ProviderLayout = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Get current page title dynamically
  const getPageTitle = () => {
    switch(location.pathname) {
        case '/provider/dashboard': return 'Dashboard';
        case '/provider/schedule': return 'My Schedule';
        case '/provider/services': return 'My Services';
        case '/provider/profile': return 'My Profile';
        default: return 'Servito Pro';
    }
  };

  const hideBottomNav = location.pathname.startsWith('/provider/services');

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* --- SHARED HEADER --- */}
      {/* You can customize this per page if needed, or keep it generic */}
      {/* <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3 d-flex justify-content-between align-items-center"> */}
        
        {/* Left: Branding or Title */}
        {/* <div className="d-flex align-items-center gap-3">
            {location.pathname === '/provider/dashboard' ? (
                // Dashboard specific header
                <div className="d-flex align-items-center gap-3">
                    <Link to="/provider/profile">
                        <img src={getImg(user?.profile_img)} className="rounded-circle border" style={{width:'40px', height:'40px', objectFit:'cover'}} alt="Profile" />
                    </Link>
                    <div>
                        <h6 className="m-0 fw-bold text-dark lh-1">Hello, {user?.name?.split(' ')[0]}</h6>
                        <small className="text-muted" style={{fontSize:'0.75rem'}}>Online</small>
                    </div>
                </div>
            ) : (
                // Generic Page Header
                <h5 className="m-0 fw-bold text-dark">{getPageTitle()}</h5>
            )}
        </div> */}

        {/* Right: Actions (Notification, etc.) */}
        {/* <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light rounded-circle text-muted position-relative p-2">
                <i className="bi bi-bell"></i>
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
        </div> */}

      {/* </div> */}

      {/* --- PAGE CONTENT (Outlet) --- */}
      {/* We add padding top if needed, though sticky header usually handles itself */}
      <div className="animate-fade-in"> 
        <Outlet />
      </div>

      {/* --- SHARED BOTTOM NAV --- */}
        {!hideBottomNav && <ProviderBottomNav /> }
      
    </div>
  );
};

export default ProviderLayout;