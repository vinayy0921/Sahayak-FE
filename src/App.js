import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "./pages/customer/UserLayout";

// Public Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login"; 
import Registration from "./pages/auth/UserRegister"; 
import ProviderRegister from "./pages/auth/ProviderRegister";

// Customer Pages
import Home from "./pages/customer/Home"; // Make sure this is your Home.jsx content
import SearchPage from "./pages/customer/SearchPage";
import ProfilePage from "./pages/customer/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES (No Navbar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/provider/register" element={<ProviderRegister />} />

        {/* PROTECTED USER ROUTES (With Navbar & BottomNav) */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="my-bookings" element={<h1>My Bookings</h1>} />
          
        </Route>

      </Routes>
    </Router>
  );
}

export default App;