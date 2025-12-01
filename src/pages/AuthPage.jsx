// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AuthPage.css";

const AuthPage = ({ initialMode = "login" }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // "login" | "signup"

  const isLogin = mode === "login";

  // BACK -> landing page
  const handleBack = () => {
    navigate("/"); // seedha home pe
  };

  // ---------------- LOGIN FORM STATE ----------------
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginData.identifier.trim()) {
      errors.identifier = "Email or mobile is required";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length) {
      setLoginErrors(errors);
    } else {
      setLoginErrors({});
      console.log("Login data:", loginData);
      alert("Login successful (dummy)");
    }
  };

  // ---------------- SIGNUP FORM STATE ----------------
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = () => {
    const errors = {};

    if (!signupData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    if (!signupData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.email)) {
        errors.email = "Enter a valid email";
      }
    }

    if (!signupData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(signupData.mobile)) {
        errors.mobile = "Mobile must be 10 digits";
      }
    }

    if (!signupData.city.trim()) {
      errors.city = "City is required";
    }

    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (signupData.confirmPassword !== signupData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validateSignup();
    if (Object.keys(errors).length) {
      setSignupErrors(errors);
    } else {
      setSignupErrors({});
      console.log("Signup data:", signupData);
      alert("Registration successful!");
    }
  };

  // MODE SWITCH (button se)
  const switchMode = () => {
    if (isLogin) {
      setMode("signup");
      navigate("/signup");
    } else {
      setMode("login");
      navigate("/login");
    }
  };

  // ---------------- JSX ----------------
  return (
    <div className="auth-page-wrapper">
      {/* Back button */}
      <button className="auth-back-btn" onClick={handleBack}>
        <span>←</span>
        <span>Back</span>
      </button>

      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-side">
          {isLogin ? (
            <>
              <h2 className="auth-side-title">New here?</h2>
              <p className="auth-side-text">
                Create a free account to book electricians, plumbers and more in
                a few taps.
              </p>
              <button type="button" className="auth-side-button" onClick={switchMode}>
                Go to Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="auth-side-title">Welcome back</h2>
              <p className="auth-side-text">
                Log in with your registered email or mobile and continue
                booking.
              </p>
              <button type="button" className="auth-side-button" onClick={switchMode}>
                Go to Login
              </button>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-main">
          <h3 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h3>
          <p className="auth-subtitle">
            {isLogin
              ? "Welcome back! Please log in to continue."
              : "Create your account to book services easily."}
          </p>

          {isLogin ? (
            <form
              className="auth-form"
              onSubmit={handleLoginSubmit}
              noValidate
            >
              {/* Email / Mobile */}
              <div className="mb-3">
                <label className="form-label">Email or Mobile</label>
                <input
                  type="text"
                  name="identifier"
                  className={`form-control ${
                    loginErrors.identifier ? "is-invalid" : ""
                  }`}
                  value={loginData.identifier}
                  onChange={handleLoginChange}
                  placeholder="example@gmail.com / 9876543210"
                />
                {loginErrors.identifier && (
                  <div className="invalid-feedback">
                    {loginErrors.identifier}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    loginErrors.password ? "is-invalid" : ""
                  }`}
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                />
                {loginErrors.password && (
                  <div className="invalid-feedback">
                    {loginErrors.password}
                  </div>
                )}
              </div>

              <button type="submit" className="auth-primary-btn w-100">
                Login
              </button>
            </form>
          ) : (
            <form
              className="auth-form"
              onSubmit={handleSignupSubmit}
              noValidate
            >
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className={`form-control ${
                    signupErrors.fullName ? "is-invalid" : ""
                  }`}
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  placeholder="Your full name"
                />
                {signupErrors.fullName && (
                  <div className="invalid-feedback">
                    {signupErrors.fullName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    signupErrors.email ? "is-invalid" : ""
                  }`}
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="example@gmail.com"
                />
                {signupErrors.email && (
                  <div className="invalid-feedback">
                    {signupErrors.email}
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  className={`form-control ${
                    signupErrors.mobile ? "is-invalid" : ""
                  }`}
                  value={signupData.mobile}
                  onChange={handleSignupChange}
                  placeholder="10 digit number"
                />
                {signupErrors.mobile && (
                  <div className="invalid-feedback">
                    {signupErrors.mobile}
                  </div>
                )}
              </div>

              {/* City dropdown */}
              <div className="mb-3">
                <label className="form-label">City</label>
                <select
                  name="city"
                  className={`form-select ${
                    signupErrors.city ? "is-invalid" : ""
                  }`}
                  value={signupData.city}
                  onChange={handleSignupChange}
                >
                  <option value="">Select your city</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Ahmedabad</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                  <option>Pune</option>
                  <option>Jaipur</option>
                  <option>Surat</option>
                  <option>Lucknow</option>
                  <option>Kanpur</option>
                  <option>Nagpur</option>
                  <option>Indore</option>
                  <option>Thane</option>
                  <option>Bhopal</option>
                  <option>Patna</option>
                  <option>Vadodara</option>
                  <option>Ghaziabad</option>
                  <option>Ludhiana</option>
                  <option>Agra</option>
                  <option>Nashik</option>
                  <option>Faridabad</option>
                  <option>Meerut</option>
                  <option>Rajkot</option>
                  <option>Varanasi</option>
                  <option>Srinagar</option>
                  <option>Aurangabad</option>
                  <option>Dhanbad</option>
                  <option>Amritsar</option>
                  <option>Ranchi</option>
                  <option>Coimbatore</option>
                  <option>Guwahati</option>
                  <option>Chandigarh</option>
                  <option>Other</option>
                </select>
                {signupErrors.city && (
                  <div className="invalid-feedback">{signupErrors.city}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    signupErrors.password ? "is-invalid" : ""
                  }`}
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Create password"
                />
                {signupErrors.password && (
                  <div className="invalid-feedback">
                    {signupErrors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${
                    signupErrors.confirmPassword ? "is-invalid" : ""
                  }`}
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Re-enter password"
                />
                {signupErrors.confirmPassword && (
                  <div className="invalid-feedback">
                    {signupErrors.confirmPassword}
                  </div>
                )}
              </div>

              <button type="submit" className="auth-primary-btn w-100">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
