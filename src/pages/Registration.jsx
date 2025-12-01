import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";
import "../AuthPage.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",      // Matches PHP $name
    email: "",     // Matches PHP $email
    phone: "",     // Matches PHP $phone
    address: "",   // ADDED THIS (Required by DB)
    locality: "",  // Matches PHP $locality
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Client Side Validation
    if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register_customer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Registration Successful! Please Login.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="auth-page-wrapper">
       {/* ... Keep Layout ... */}
       <div className="auth-main">
          <h3 className="auth-title">Sign Up</h3>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>

            {/* Mobile */}
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
            </div>

            {/* Address (ADDED) */}
            <div className="mb-3">
              <label className="form-label">Full Address</label>
              <input type="text" name="address" className="form-control" onChange={handleChange} placeholder="Flat No, Building Name" required />
            </div>

            {/* Locality */}
            <div className="mb-3">
              <label className="form-label">Locality / City</label>
              <input type="text" name="locality" className="form-control" onChange={handleChange} required />
            </div>

            {/* Passwords */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
              <small className="text-danger">{errors.confirmPassword}</small>
            </div>

            <button type="submit" className="btn btn-primary w-100 auth-primary-btn">Sign Up</button>
          </form>
       </div>
    </div>
  );
};

export default Registration;