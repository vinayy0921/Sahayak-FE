// src/pages/user/UserDashboard.jsx
import React from 'react';
import UserNavbar from '../../components/UserNavbar';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <>
      <UserNavbar />
      <div className="container py-5">
        
        {/* 1. Welcome Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="p-5 bg-light rounded-4 shadow-sm border">
              <h1 className="display-5 fw-bold text-dark">Welcome back!</h1>
              <p className="lead">Need something fixed today?</p>
              <Link to="/search" className="btn btn-primary btn-lg mt-3">Book a Service Now</Link>
            </div>
          </div>
        </div>

        {/* 2. Quick Stats / Active Bookings */}
        <h4 className="mb-3 fw-bold">Current Status</h4>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="text-muted">Active Bookings</h6>
              <h2 className="fw-bold text-primary">0</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="text-muted">Total Spent</h6>
              <h2 className="fw-bold text-success">₹0</h2>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UserDashboard;