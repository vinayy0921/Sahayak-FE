import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';
import Dialog from '../../components/ui/Dialog';

const ProviderRegister = () => {
  const navigate = useNavigate();
  
  // --- 1. STATE ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    address: '', city: '',
    profession: '', experience_years: '', bio: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 2. VALIDATION PER STEP ---
  const validateStep = () => {
    if (step === 1) {
        if (!formData.name || !formData.phone || !formData.email || !formData.password) {
            alert("Please fill all Personal Details");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }
    }
    if (step === 2) {
        if (!formData.address || !formData.city) {
            alert("Please fill Address Details");
            return false;
        }
    }
    if (step === 3) {
        if (!formData.profession || !formData.experience_years) {
            alert("Please fill Work Profile");
            return false;
        }
    }
    return true;
  };

  // --- 3. NAVIGATION ---
  const handleNext = () => {
    if (validateStep()) {
        setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // --- 4. FINAL SUBMIT ---
  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    const payload = { ...formData, role: 'provider' };

    try {
      const response = await fetch(`${API_BASE_URL}register_provider.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.status === 'success') {
        // Show Dialog 
        setShowSuccessModal(true);
      } else {
        alert(data.message || "Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
        setLoading(false);
    }
  };

  // Helper for Step Class
  const getStepClass = (s) => {
    if (s < step) return "bg-success text-white border-success"; // Completed
    if (s === step) return "bg-primary text-white border-primary"; // Active
    return "bg-light text-muted border"; // Pending
  };

  return (
    <>
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" style={{background: '#f8f9fa'}}>
      
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{maxWidth: '900px', width:'100%'}}>
        <div className="row g-0">
            
            {/* LEFT SIDE: SUMMARY & STEPS */}
            <div className="col-lg-4 bg-primary text-white p-5 d-flex flex-column">
                <h3 className="fw-bold mb-4">Partner Signup</h3>
                <p className="opacity-75 mb-5">Join Servito in 3 simple steps.</p>

                {/* Vertical Stepper */}
                <div className="d-flex flex-column gap-4">
                    
                    {/* Step 1 */}
                    <div className="d-flex align-items-center gap-3">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${getStepClass(1)}`} style={{width:'40px', height:'40px'}}>
                            {step > 1 ? <i className="fa-solid fa-check"></i> : '1'}
                        </div>
                        <span className={step >= 1 ? "fw-bold" : "opacity-50"}>Personal Info</span>
                    </div>

                    <div className="vr ms-3 opacity-25" style={{height:'30px'}}></div>

                    {/* Step 2 */}
                    <div className="d-flex align-items-center gap-3">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${getStepClass(2)}`} style={{width:'40px', height:'40px'}}>
                            {step > 2 ? <i className="fa-solid fa-check"></i> : '2'}
                        </div>
                        <span className={step >= 2 ? "fw-bold" : "opacity-50"}>Location</span>
                    </div>

                    <div className="vr ms-3 opacity-25" style={{height:'30px'}}></div>

                    {/* Step 3 */}
                    <div className="d-flex align-items-center gap-3">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold ${getStepClass(3)}`} style={{width:'40px', height:'40px'}}>
                            3
                        </div>
                        <span className={step >= 3 ? "fw-bold" : "opacity-50"}>Work Profile</span>
                    </div>

                </div>

                <div className="mt-auto pt-5">
                    <small className="opacity-50">Already registered?</small> <br/>
                    <Link to="/login" className="text-white fw-bold text-decoration-none">Login here &rarr;</Link>
                </div>
            </div>

            {/* RIGHT SIDE: FORMS */}
            <div className="col-lg-8 bg-white p-5">
                <div className="step-container">
                    
                    {/* === STEP 1: PERSONAL === */}
                    {step === 1 && (
                        <div>
                            <h4 className="fw-bold mb-4 text-dark">Who are you?</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="e.g. Rajesh Kumar" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="98765..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="rajesh@gmail.com" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" name="confirmPassword" className="form-control" value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === STEP 2: LOCATION === */}
                    {step === 2 && (
                        <div>
                            <h4 className="fw-bold mb-4 text-dark">Where are you based?</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Full Address</label>
                                    <textarea name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange} placeholder="Shop No, Area, Landmark"></textarea>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">City</label>
                                    <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                                        <option value="">Select City</option>
                                        <option>Surat</option>
                                        <option>Ahmedabad</option>
                                        <option>Vadodara</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === STEP 3: WORK === */}
                    {step === 3 && (
                        <div>
                            <h4 className="fw-bold mb-4 text-dark">What do you do?</h4>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Profession</label>
                                    <select name="profession" className="form-select" value={formData.profession} onChange={handleChange}>
                                        <option value="">Select Category</option>
                                        <option>Plumber</option>
                                        <option>Electrician</option>
                                        <option>Carpenter</option>
                                        <option>Cleaner</option>
                                        <option>AC Repair</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Experience (Years)</label>
                                    <input type="number" name="experience_years" className="form-control" value={formData.experience_years} onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Short Bio (Optional)</label>
                                    <textarea name="bio" className="form-control" rows="2" value={formData.bio} onChange={handleChange} placeholder="e.g. Expert in pipe fitting..."></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="d-flex justify-content-between mt-5 pt-3 border-top">
                        {step > 1 ? (
                            <button className="btn btn-outline-secondary px-4 rounded-pill" onClick={handleBack}>
                                Back
                            </button>
                        ) : <div></div>}

                        {step < 3 ? (
                            <button className="btn btn-primary px-5 rounded-pill" onClick={handleNext}>
                                Next <i className="fa-solid fa-arrow-right ms-2"></i>
                            </button>
                        ) : (
                            <button 
                                className="btn btn-success px-5 rounded-pill fw-bold" 
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Account"}
                            </button>
                        )}
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>

    {/* === 5. SUCCESS DIALOG === */}
    <Dialog 
      isOpen={showSuccessModal} 
      onClose={() => navigate('/login')} 
      title="Welcome Aboard!"
    >
      <div className="text-center">
          {/* Success Icon (Green) */}
          <div style={{
              width: '70px', height: '70px', 
              background: '#ecfdf5', color: '#10b981', 
              borderRadius: '50%', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', 
              fontSize: '2rem', margin: '0 auto 16px auto'
          }}>
              <i className="fa-solid fa-check"></i>
          </div>
          
          <h4 className="fw-bold text-dark mb-2">Registration Successful</h4>
          
          <p className="text-muted small mb-4">
              Your provider account has been created. Log in now to start accepting jobs and managing your services.
          </p>

          <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary w-100 rounded-pill fw-bold py-2 shadow-sm"
          >
              Login to Dashboard
          </button>
      </div>
    </Dialog>
    </>
  );
};

export default ProviderRegister;