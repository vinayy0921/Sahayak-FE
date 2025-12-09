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
import Home from "./pages/customer/Home"; 
import SearchPage from "./pages/customer/SearchPage";
import SavedAddresses from "./pages/customer/SavedAddresses";
import ProfilePage from "./pages/customer/ProfilePage";
import BookingPage from "./pages/customer/BookingPage";
import ProviderProfile from "./pages/provider/ProviderProfile";
import MyBookings from "./pages/customer/MyBookings";
import BookingTimeline from "./pages/customer/BookingTimeline";

// Provider Pages
import ProviderSchedule from "./pages/provider/ProviderSchedule";
import MyServices from "./pages/provider/MyServices";
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderLayout from "./pages/provider/ProviderLayout";
import ProviderDetails from "./pages/customer/ProviderDetails";

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

        {/* PROTECTED PROVIDER ROUTES (With Provider Navbar & BottomNav) */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="schedule" element={<ProviderSchedule />} />
          <Route path="services" element={<MyServices />} />
          <Route path="profile" element={<ProviderProfile />} />
          
        </Route>

        
      </Routes>
    </Router>
  );
}

export default App;
