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
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderSchedule from "./pages/provider/ProviderSchedule";
import ProviderProfile from "./pages/provider/ProviderProfile";
import MyServices from "./pages/provider/MyServices";
import BookingTimeline from "./pages/customer/BookingTimeline";
import SavedAddresses from "./pages/customer/SavedAddresses";

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
          <Route path="booking/:id" element={<BookingTimeline />} />
          <Route path="saved-addresses" element={<SavedAddresses />} />
        </Route>

        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/schedule" element={<ProviderSchedule />} />
        <Route path="/provider/profile" element={<ProviderProfile />} />
        <Route path="/provider/services" element={<MyServices />} />
        

      </Routes>
    </Router>
  );
}

export default App;
