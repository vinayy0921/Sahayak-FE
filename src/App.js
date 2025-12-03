import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import ProviderDetails from "./pages/customer/ProviderDetails";
import BookingPage from "./pages/customer/BookingPage";
import MyBookings from "./pages/customer/MyBookings";

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
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="book-service" element={<BookingPage />} />
          <Route path="provider/:id" element={<ProviderDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
