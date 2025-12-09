import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/apiConfig"; 
import "../../styles/AuthPage.css";
import Dialog from '../../components/ui/Dialog'; 

const Login = () => {
  const navigate = useNavigate();
  
  // State
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name] || errors.form) {
        setErrors({ ...errors, [e.target.name]: "", form: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    if (!formData.email || !formData.password) {
        setErrors({ form: "Please fill all fields" });
        return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "success") {
        // 1. Save Session
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // 2. Show Success Dialog
        setShowSuccessModal(true); 
        setLoading(false);

        // 3. Redirect after delay (2 seconds is better UX than 3)
        setTimeout(() => {
            if (data.user.role === "admin") navigate("/admin/dashboard");
            else if (data.user.role === "provider") navigate("/provider/dashboard");
            else if (data.user.role === "customer") navigate("/user/home");
            else navigate("/"); 
        }, 2000);
        
      } else {
        setErrors({ form: data.message || "Login failed." });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: "Server connection failed." });
      setLoading(false);
    }
  };

  return (
    <>
    <div className="auth-page-wrapper">
      <button className="auth-back-btn" onClick={() => navigate("/")}>
        <span>←</span> Back
      </button>

      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-side">
          <h2 className="auth-side-title">New Here?</h2>
          <p className="auth-side-text">
            Create a free account to book electricians, plumbers, and more.
          </p>
          <Link to="/signup" className="auth-side-button text-decoration-none">
            Go to Sign Up
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-main">
          <h3 className="auth-title">Login</h3>
          
          {errors.form && (
            <div className="alert alert-danger d-flex align-items-center p-2 mb-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{errors.form}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.form ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.form ? "is-invalid" : ""}`}
                value={formData.password}
                onChange={handleChange}
                autoComplete="on"
                placeholder="Password"
                disabled={loading}
              />
            </div>

            <button 
                type="submit" 
                className="auth-primary-btn w-100 d-flex justify-content-center align-items-center" 
                disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* === SUCCESS DIALOG === */}
    <Dialog 
      isOpen={showSuccessModal} 
      // Prevents closing by clicking outside (forces wait for redirect)
      onClose={() => {}} 
      title="Access Granted"
    >
      <div className="text-center py-2">
          <div className="mx-auto mb-3 bg-green-50 text-green-500 w-16 h-16 rounded-full flex items-center justify-center">
              {/* <i className="fa-solid fa-check text-2xl"></i> */}
              <i className="fa-regular fa-circle-check text-2xl" style={{fontSize:"100px", color:"green"}}></i>
          </div>
          
          <h4 className="font-bold text-slate-800 mb-2">Successfully Logged In!</h4>
          
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
             <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
             <span>Redirecting you to dashboard...</span>
          </div>
      </div>
    </Dialog>
    </>
  );
};

export default Login;