// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../AuthPage.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = "Email or mobile is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Login Data:", formData);
      alert("Login successful (dummy)!");
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Back button - top left */}
      <button
        type="button"
        className="auth-back-btn"
        onClick={handleBack}
      >
        <span>←</span>
        <span>Back</span>
      </button>

      <div className="auth-shell">
        {/* LEFT SIDE: info + link to Sign Up */}
        <div className="auth-side">
          <h2 className="auth-side-title">New to Sahayak?</h2>
          <p className="auth-side-text">
            Create your free account to book electricians, plumbers and more in
            a few taps.
          </p>
          <Link to="/signup" className="auth-side-button">
            Go to Sign Up
          </Link>
        </div>

        {/* RIGHT SIDE: Login form */}
        <div className="auth-main">
          <h3 className="auth-title">Login</h3>
          <p className="auth-subtitle">
            Welcome back! Please log in to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Email / Mobile */}
            <div className="mb-3">
              <label className="form-label">Email or Mobile</label>
              <input
                type="text"
                name="emailOrMobile"
                className={`form-control ${
                  errors.emailOrMobile ? "is-invalid" : ""
                }`}
                value={formData.emailOrMobile}
                onChange={handleChange}
                placeholder="e.g. vinay@admin.com or 9876543210"
              />
              {errors.emailOrMobile && (
                <div className="invalid-feedback">{errors.emailOrMobile}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 auth-primary-btn mt-1"
            >
              Login
            </button>
          </form>

          {/* Extra text niche chhota sa */}
          <p className="auth-footer-text">
            Don&apos;t have an account yet?{" "}
            <Link to="/signup" className="auth-footer-link">
              Sign up instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
