import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig"; // 1. Import Config
import "../styles/AuthPage.css";

const AuthPage = ({ initialMode = "login" }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const isLogin = mode === "login";

  const handleBack = () => navigate("/");

  // ---------------- LOGIN STATE ----------------
  const [loginData, setLoginData] = useState({
    email: "", // Changed identifier -> email to match Backend
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginErrors({});

    // Simple Validation
    if (!loginData.email || !loginData.password) {
      setLoginErrors({ form: "Please fill all fields" });
      return;
    }

    try {
      // 2. Connect to PHP Backend
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");
        
        // Redirect based on role
        if (data.user.role === "provider") navigate("/provider-dashboard");
        else if (data.user.role === "admin") navigate("/admin-dashboard");
        else navigate("/"); 
      } else {
        setLoginErrors({ form: data.message });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setLoginErrors({ form: "Server Connection Error" });
    }
  };

  // ---------------- SIGNUP STATE ----------------
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    address: "", // 3. Added Missing Address Field
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupErrors({});

    if (signupData.password !== signupData.confirmPassword) {
      setSignupErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // 4. Map Frontend names to Backend names
    const payload = {
      name: signupData.fullName,
      email: signupData.email,
      phone: signupData.mobile,
      locality: signupData.city,
      address: signupData.address,
      password: signupData.password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/register_customer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.status === "success") {
        alert("Registration Successful! Please Login.");
        setMode("login"); // Switch to login view
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Server Connection Failed");
    }
  };

  const switchMode = () => {
    setMode(isLogin ? "signup" : "login");
    setLoginErrors({});
    setSignupErrors({});
  };

  // ---------------- JSX ----------------
  return (
    <div className="auth-page-wrapper">
      <button className="auth-back-btn" onClick={handleBack}>
        <span>←</span> <span>Back</span>
      </button>

      <div className="auth-card">
        {/* LEFT SIDE (Toggle) */}
        <div className="auth-side">
          {isLogin ? (
            <>
              <h2 className="auth-side-title">New here?</h2>
              <p className="auth-side-text">Create a free account to book services.</p>
              <button type="button" className="auth-side-button" onClick={switchMode}>Go to Sign Up</button>
            </>
          ) : (
            <>
              <h2 className="auth-side-title">Welcome back</h2>
              <p className="auth-side-text">Log in with your email to continue.</p>
              <button type="button" className="auth-side-button" onClick={switchMode}>Go to Login</button>
            </>
          )}
        </div>

        {/* RIGHT SIDE (Forms) */}
        <div className="auth-main">
          <h3 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h3>

          {/* Global Error Message */}
          {loginErrors.form && <div className="alert alert-danger p-2 mb-3">{loginErrors.form}</div>}

          {isLogin ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit" className="auth-primary-btn w-100">Login</button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignupSubmit}>
              <div className="mb-2">
                <label className="form-label">Full Name</label>
                <input type="text" name="fullName" className="form-control" value={signupData.fullName} onChange={handleSignupChange} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={signupData.email} onChange={handleSignupChange} required />
              </div>

              <div className="mb-2">
                <label className="form-label">Mobile</label>
                <input type="tel" name="mobile" className="form-control" value={signupData.mobile} onChange={handleSignupChange} required />
              </div>

              {/* Added Address Field */}
              <div className="mb-2">
                <label className="form-label">Address</label>
                <input type="text" name="address" className="form-control" value={signupData.address} onChange={handleSignupChange} placeholder="Flat / Building" required />
              </div>

              <div className="mb-2">
                <label className="form-label">City</label>
                <select name="city" className="form-select" value={signupData.city} onChange={handleSignupChange} required>
                  <option value="">Select City</option>
                  <option>Surat</option>
                  <option>Ahmedabad</option>
                  <option>Vadodara</option>
                  <option>Rajkot</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" value={signupData.password} onChange={handleSignupChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control" value={signupData.confirmPassword} onChange={handleSignupChange} required />
                <small className="text-danger">{signupErrors.confirmPassword}</small>
              </div>

              <button type="submit" className="auth-primary-btn w-100">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;