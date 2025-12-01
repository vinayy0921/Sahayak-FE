// src/pages/Registration.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../AuthPage.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    locality: "",
    password: "",
    confirmPassword: "",
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

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.mobile)) {
        newErrors.mobile = "Mobile must be 10 digits";
      }
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Locality required chahiye to uncomment karo
    // if (!formData.locality.trim()) {
    //   newErrors.locality = "Locality is required";
    // }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Registration Data:", formData);
      alert("Registration successful!");
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
        {/* LEFT SIDE: info + link to Login */}
        <div className="auth-side">
          <h2 className="auth-side-title">Already have an account?</h2>
          <p className="auth-side-text">
            Log in with your existing email or mobile to see your bookings.
          </p>
          <Link to="/login" className="auth-side-button">
            Go to Login
          </Link>
        </div>

        {/* RIGHT SIDE: Sign Up form */}
        <div className="auth-main">
          <h3 className="auth-title">Sign Up</h3>
          <p className="auth-subtitle">
            Create your account to book services easily.
          </p>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className={`form-control ${
                  errors.fullName ? "is-invalid" : ""
                }`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${
                  errors.email ? "is-invalid" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Mobile */}
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                className={`form-control ${
                  errors.mobile ? "is-invalid" : ""
                }`}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10 digit number"
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile}</div>
              )}
            </div>

            {/* Locality */}
            <div className="mb-3">
              <label className="form-label">Locality (optional)</label>
              <input
                type="text"
                name="locality"
                className={`form-control ${
                  errors.locality ? "is-invalid" : ""
                }`}
                value={formData.locality}
                onChange={handleChange}
                placeholder="Enter your locality"
              />
              {errors.locality && (
                <div className="invalid-feedback">{errors.locality}</div>
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
                placeholder="Create a password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 auth-primary-btn mt-1"
            >
              Sign Up
            </button>
          </form>

          <p className="auth-footer-text">
            Already registered?{" "}
            <Link to="/login" className="auth-footer-link">
              Login instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
