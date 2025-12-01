import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Login & Signup same page, animation ke saath */}
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
