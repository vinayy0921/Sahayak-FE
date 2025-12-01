import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig"; // Import Config
import "../AuthPage.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
        setErrors({ form: "Please fill all fields" });
        return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Save user info to LocalStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful! Welcome " + data.user.name);

        // Redirect based on role
        if (data.user.role === "admin") navigate("/admin-dashboard");
        else if (data.user.role === "provider") navigate("/provider-dashboard");
        else if (data.user.role === "customer") navigate("/customer-dashboard");
        else navigate("/"); // Customer home
      } else {
        setErrors({ form: data.message });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: "Server error. Please try again." });
    }
  };

  return (
    <div className="auth-page-wrapper">
        {/* ... Keep your existing Layout/HTML ... */}
        
        <div className="auth-main">
          <h3 className="auth-title">Login</h3>
          
          {errors.form && <div className="alert alert-danger">{errors.form}</div>}

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
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 auth-primary-btn">
              Login
            </button>
          </form>
          
          {/* ... Footer Links ... */}
        </div>
    </div>
  );
};

export default Login;