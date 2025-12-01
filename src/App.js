import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"; // Import separate file
import Registration from "./pages/Registration"; // Import separate file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Separate Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        
        {/* Keep your provider route if needed */}
        {/* <Route path="/provider-register" element={<ProviderRegister />} /> */}
      </Routes>
    </Router>
  );
}

export default App;