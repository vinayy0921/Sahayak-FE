import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); // 2. Initialize the hook
  
  // Mock User Data
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };

  // 3. The Redirect Function
  const handleSearchRedirect = () => {
    navigate('/user/search');
  };

  return (
    <header className="glass-header w-100 py-3">
      <div className="container">
        
        {/* === TOP ROW: Logo & Profile === */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          
          {/* Left: Brand Logo */}
          <Link to="/user/dashboard" className="text-decoration-none">
            <h3 className="m-0 fw-bold" style={{ letterSpacing: '-0.5px', color: '#2c3e50' }}>
              SAHAYAK<span className="text-primary">.</span>
            </h3>
          </Link>

          {/* Right: Profile Section */}
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <span className="d-block small text-muted">Welcome,</span>
              <span className="fw-bold text-dark">{user.name}</span>
            </div>
            {/* Avatar Circle */}
            <div 
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: '45px', height: '45px', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* === BOTTOM ROW: Location & Search === */}
        <div className="row align-items-center gx-3">
          
          {/* Left: Location Pill */}
          <div className="col-auto">
            <div className="location-pill">
              <i className="bi bi-geo-alt-fill"></i>
              <span className="small">Adajan, Surat</span>
            </div>
          </div>

          {/* Middle: Search Bar */}
          <div className="col">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0 position-absolute" style={{ zIndex: 5, left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <i className="bi bi-search text-muted"></i>
              </span>
              
              {/* 4. Added onClick (and onFocus) event here */}
              <input 
                type="text" 
                className="form-control glass-search-input py-2" 
                placeholder="Find Electricians, Plumbers..." 
                style={{ paddingLeft: '45px' }}
                onClick={handleSearchRedirect} // Trigger on click
                onFocus={handleSearchRedirect} // Trigger if they tab into it
                readOnly // Optional: Makes mobile keyboard not pop up immediately during redirect
              />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;