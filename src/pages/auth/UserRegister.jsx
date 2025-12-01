import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/apiConfig";
import "../../styles/AuthPage.css";

const Registration = () => {
  const navigate = useNavigate();

  // 1. Updated State to hold granular address details
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    
    // Address Split inputs
    house: "",    // e.g., Flat 101
    building: "", // e.g., Gokul Dham Society
    area: "",     // e.g., Adajan (This will be sent as Locality)
    city: "",     // e.g., Surat

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific error when user types
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // --- STRICT VALIDATION ---
    const newErrors = {};

    // 1. Name Validation
    if (!formData.name.trim()) {
        newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters";
    }

    // 2. Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
    }

    // 3. Phone Validation (10 Digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
        newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    
    // 4. Address Validations
    if (!formData.house.trim()) newErrors.house = "House No is required";
    if (!formData.building.trim()) newErrors.building = "Building/Society is required";
    if (!formData.area.trim()) newErrors.area = "Area is required";
    if (!formData.city) newErrors.city = "City is required";

    // 5. Password Validation (Min 6 chars)
    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }

    // 6. Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
    }

    // If any error exists, stop submission
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    // --- THE COMBINER FUNCTION ---
    // Combine inputs into one specific string for the Backend 'address' column
    const fullAddress = `${formData.house}, ${formData.building}, ${formData.area}, ${formData.city}`;

    // --- PAYLOAD CREATION ---
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      
      address: fullAddress, 
      locality: formData.area, 
      
      password: formData.password
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
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Connection Error");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <button className="auth-back-btn" onClick={() => navigate("/")}>
        <span>←</span> Back
      </button>

      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-side">
          <h2 className="auth-side-title">Welcome Back</h2>
          <p className="auth-side-text">
            Already have an account? Log in to manage your bookings.
          </p>
          <Link to="/login" className="auth-side-button">
            Go to Login
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-main">
          <h3 className="auth-title">Sign Up</h3>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} />
              <small className="text-danger">{errors.name}</small>
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} />
              <small className="text-danger">{errors.email}</small>
            </div>

            <div className="mb-2">
              <label className="form-label">Mobile</label>
              <input type="tel" name="phone" className="form-control" onChange={handleChange} />
              <small className="text-danger">{errors.phone}</small>
            </div>

            {/* --- NEW SPLIT ADDRESS SECTION --- */}
            <div className="row">
                <div className="col-6 mb-2">
                    <label className="form-label">House/Flat No</label>
                    <input type="text" name="house" className="form-control" placeholder="e.g. A-101" onChange={handleChange} />
                    <small className="text-danger">{errors.house}</small>
                </div>
                <div className="col-6 mb-2">
                    <label className="form-label">Building/Society</label>
                    <input type="text" name="building" className="form-control" placeholder="e.g. Gokul Dham" onChange={handleChange} />
                    <small className="text-danger">{errors.building}</small>
                </div>
            </div>

            <div className="row">
                <div className="col-6 mb-2">
                    <label className="form-label">Area</label>
                    <input type="text" name="area" className="form-control" placeholder="e.g. Adajan" onChange={handleChange} />
                    <small className="text-danger">{errors.area}</small>
                </div>
                <div className="col-6 mb-2">
                    <label className="form-label">City</label>
                    <select name="city" className="form-control" onChange={handleChange}>
                        <option value="">Select</option>
                        <option>Surat</option>
                        <option>Ahmedabad</option>
                        <option>Vadodara</option>
                        <option>Rajkot</option>
                    </select>
                    <small className="text-danger">{errors.city}</small>
                </div>
            </div>
            {/* --------------------------------- */}

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} />
              <small className="text-danger">{errors.password}</small>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} />
              <small className="text-danger">{errors.confirmPassword}</small>
            </div>

            <button type="submit" className="auth-primary-btn w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;