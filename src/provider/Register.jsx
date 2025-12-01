import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';
// 1. Import Anime.js
import { animate, stagger } from 'animejs';

const Register = () => {
  const navigate = useNavigate();
  
  // State Management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    experience_years: '',
    bio: '',
    password: '',
    confirmPassword: ''
  });

  // 2. Anime.js Animation Logic
 useEffect(() => {
    // Animation 1: Card
    animate('.register-card', {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
      easing: 'outExpo', // Note: string name changed slightly in V4
      delay: 100
    });

    // Animation 2: Left Content
    animate('.left-content-item', {
      x: [-50, 0], // V4 uses 'x' instead of 'translateX'
      opacity: [0, 1],
      duration: 1000,
      delay: stagger(100, { start: 400 }),
      easing: 'outExpo'
    });

    // Animation 3: Form Fields
    animate('.form-item', {
      y: [20, 0], // V4 uses 'y' instead of 'translateY'
      opacity: [0, 1],
      duration: 800,
      delay: stagger(60, { start: 600 }),
      easing: 'outExpo'
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Small shake animation on error using animejs
     
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...payloadData } = formData;
    const payload = { ...payloadData, role: 'provider' };

    try {
      const response = await fetch(`${API_BASE_URL}/register_provider.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();

      if (data.status === 'success') {
        alert("Registration Successful! Please Login.");
        navigate('/login');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <>
      <style>
        {`
          .register-bg {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            position: relative;
            overflow: hidden;
          }
          /* Floating Blobs */
          .blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.6;
            animation: float 10s infinite ease-in-out;
          }
          .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: #96c8fb; }
          .blob-2 { bottom: -10%; right: -10%; width: 400px; height: 400px; background: #feccae; animation-delay: 5s; }

          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(30px, 50px); }
            100% { transform: translate(0, 0); }
          }
          
          /* Custom Focus Styles */
          .form-control:focus, .form-select:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
          }
        `}
      </style>

      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center register-bg py-5">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        {/* Added 'register-card' class for AnimeJS to target */}
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden register-card" style={{ maxWidth: '1100px', width: '100%', zIndex: 1, opacity: 0 }}>
          <div className="row g-0">
            
            {/* LEFT SIDE */}
            <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center p-5 text-white" 
                 style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0043a8 100%)' }}>
              
              <div className="mb-auto left-content-item">
                <h3 className="fw-bold"><span className="text-warning">SAHA</span>YAK.</h3>
              </div>
              
              <h1 className="fw-bold display-5 mb-4 left-content-item">Turn Your Skills Into Income.</h1>
              <p className="lead mb-4 opacity-75 left-content-item">Join the fastest-growing network of professionals in Surat.</p>
              
              <div className="d-flex flex-column gap-3 fs-5 opacity-90 mb-5">
                <div className="d-flex align-items-center left-content-item">
                  <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                    <i className="bi bi-currency-rupee text-white"></i>
                  </div>
                  <span>Earn on your terms</span>
                </div>
                <div className="d-flex align-items-center left-content-item">
                  <div className="bg-white bg-opacity-25 p-2 rounded-circle me-3">
                    <i className="bi bi-people-fill text-white"></i>
                  </div>
                  <span>Connect with 1000+ Customers</span>
                </div>
              </div>
              
              <div className="mt-auto left-content-item">
                <small className="opacity-75">Already have an account?</small> <br/>
                <Link to="/login" className="text-white fw-bold text-decoration-none fs-5">Login here &rarr;</Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-7 bg-white p-4 p-md-5">
              <div className="text-center text-lg-start mb-4 form-item">
                <h2 className="fw-bold text-dark">Register as a Professional</h2>
                <p className="text-muted">Fill in your details to get verified.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  
                  {/* Personal Info */}
                  <div className="col-12 form-item">
                    <h6 className="text-primary fw-bold text-uppercase small letter-spacing-1 border-bottom pb-2">Personal Details</h6>
                  </div>
                  
                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
                      <label>Full Name</label>
                    </div>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="tel" className="form-control" name="phone" placeholder="Phone" onChange={handleChange} required />
                      <label>Phone Number</label>
                    </div>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
                      <label>Email Address</label>
                    </div>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="text" className="form-control" name="city" placeholder="City" onChange={handleChange} required />
                      <label>City</label>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="col-12 mt-4 form-item">
                    <h6 className="text-primary fw-bold text-uppercase small letter-spacing-1 border-bottom pb-2">Work Profile</h6>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <select className="form-select" name="profession" onChange={handleChange} required>
                        <option value="">Select Category...</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Cleaner">Home Cleaner</option>
                        <option value="AC Repair">AC Repair</option>
                        <option value="Other">Other</option>
                      </select>
                      <label>Your Profession</label>
                    </div>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="number" className="form-control" name="experience_years" placeholder="Years" onChange={handleChange} />
                      <label>Years of Experience</label>
                    </div>
                  </div>

                  <div className="col-12 form-item">
                    <div className="form-floating">
                      <textarea className="form-control" name="bio" placeholder="Bio" style={{ height: '80px' }} onChange={handleChange}></textarea>
                      <label>Short Bio</label>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="col-12 mt-4 form-item">
                    <h6 className="text-primary fw-bold text-uppercase small letter-spacing-1 border-bottom pb-2">Security</h6>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
                      <label>Create Password</label>
                    </div>
                  </div>

                  <div className="col-md-6 form-item">
                    <div className="form-floating">
                      <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm" onChange={handleChange} required />
                      <label>Confirm Password</label>
                    </div>
                  </div>

                  <div className="col-12 mt-4 form-item">
                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm">
                      Create Partner Account
                    </button>
                  </div>

                </div>
              </form>

              <div className="text-center mt-4 d-lg-none form-item">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-primary fw-bold text-decoration-none">Login</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;