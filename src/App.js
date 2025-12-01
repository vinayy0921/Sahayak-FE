import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login"; 
import Registration from "./pages/auth/UserRegister"; 
import Register from "./pages/auth/ProviderRegister";
import UserDashboard from "./pages/customer/UserDashboard";
import SearchPage from "./pages/customer/SearchPage";
import ProfilePage from "./pages/customer/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/provider/register" element={<Register />} />

      <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/search" element={<SearchPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route path="/user/my-bookings" element={<h1>My Bookings Page Coming Soon</h1>} />

      </Routes>
    </Router>
  );
}

export default App;