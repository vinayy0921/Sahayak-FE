import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig"; 
import "../styles/AuthPage.css"; // Ensure you keep the CSS file

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
        setErrors({ form: "Please fill all fields" });
        return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        // 1. Save Session
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");

        // 2. Redirect based on Role
        if (data.user.role === "admin") navigate("/admin-dashboard");
        else if (data.user.role === "provider") navigate("/provider-dashboard");
        else navigate("/"); // Customer Home
      } else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: "Server connection failed" });
    }
  };

  return (
    <div className="auth-page-wrapper">
      <button className="auth-back-btn" onClick={() => navigate("/")}>
        <span>←</span> Back
      </button>

      <div className="auth-card">
        {/* LEFT SIDE (Go to Signup) */}
        <div className="auth-side">
          <h2 className="auth-side-title">New Here?</h2>
          <p className="auth-side-text">
            Create a free account to book electricians, plumbers, and more.
          </p>
          <Link to="/signup" className="auth-side-button">
            Go to Sign Up
          </Link>
        </div>

        {/* RIGHT SIDE (Login Form) */}
        <div className="auth-main">
          <h3 className="auth-title">Login</h3>
          
          {errors.form && <div className="alert alert-danger p-2 mb-3">{errors.form}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="auth-primary-btn w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;