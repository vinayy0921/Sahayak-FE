import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const service = state?.service; 
  const user = JSON.parse(localStorage.getItem('user'));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);

  // Helper for Image
  const getImg = (img) => {
    if(!img) return "https://via.placeholder.com/80";
    return img.startsWith('http') ? img : `${API_BASE_URL}${img}`;
  };

  if (!service || !user) {
    return (
        <div className="container py-5 text-center">
            <h5>Invalid Access</h5>
            <button className="btn btn-primary btn-sm mt-3" onClick={() => navigate('/user/search')}>Go to Search</button>
        </div>
    );
  }

  const handleConfirm = async () => {
    if(!date || !time || !address.trim()) {
        alert("Please fill in all details (Date, Time, Address)");
        return;
    }

    setLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}user/create_booking.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer_id: user.id,
                provider_id: service.provider_id,
                service_id: service.service_id || service.id, 
                date: date,
                time_slot: time,
                address: address
            })
        });
        const data = await response.json();
        
        if(data.status === 'success') {
            alert("✅ Booking Confirmed!");
            navigate('/user/my-bookings');
        } else {
            alert("Booking Failed: " + data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Server Error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 mt-2 pb-5">
      
      {/* HEADER */}
      <div className="bg-white px-3 py-3 border-bottom shadow-sm sticky-top z-3">
        <div className="container d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h5 className="m-0 fw-bold">Review & Book</h5>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-4 flex-column-reverse flex-lg-row">
            
            {/* === LEFT COLUMN: FORM === */}
            <div className="col-lg-8">
                
                {/* 1. SERVICE DETAILS */}
                <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
                    <div className="d-flex gap-3 align-items-center">
                        <img src={getImg(service.profile_img)} className="rounded-3" style={{width:'80px', height:'80px', objectFit:'cover'}} alt=""/>
                        <div>
                            <h5 className="fw-bold mb-1">{service.service_name}</h5>
                            <p className="text-muted small mb-0">
                                By {service.provider_name || service.name} 
                                {service.is_verified == 1 && <i className="fa-solid fa-circle-check text-primary ms-1"></i>}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. SCHEDULE FORM */}
                <h6 className="fw-bold text-secondary text-uppercase small mb-3 ms-1">Step 1: Schedule</h6>
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label small fw-bold text-muted">Select Date</label>
                            <input 
                                type="date" 
                                className="form-control form-control-lg bg-light border-0" 
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Select Time</label>
                            <select className="form-select form-select-lg bg-light border-0" onChange={(e) => setTime(e.target.value)}>
                                <option value="">Choose Slot...</option>
                                <option value="09:00 AM">09:00 AM - Morning</option>
                                <option value="11:00 AM">11:00 AM - Morning</option>
                                <option value="02:00 PM">02:00 PM - Afternoon</option>
                                <option value="04:00 PM">04:00 PM - Evening</option>
                                <option value="06:00 PM">06:00 PM - Evening</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. LOCATION FORM */}
                <h6 className="fw-bold text-secondary text-uppercase small mb-3 ms-1">Step 2: Location</h6>
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                    <div className="d-flex gap-3">
                        <div className="mt-1"><i className="fa-solid fa-location-dot text-danger fs-5"></i></div>
                        <div className="w-100">
                            <label className="form-label small fw-bold text-muted">Service Address</label>
                            <textarea 
                                className="form-control bg-light border-0" 
                                rows="2"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter House No, Building, Landmark..."
                            ></textarea>
                        </div>
                    </div>
                </div>

            </div>

            {/* === RIGHT COLUMN: SUMMARY (Sticky on Desktop) === */}
            <div className="col-lg-4">
                <div className="sticky-top" style={{top: '90px'}}>
                    <div className="card border-0 shadow rounded-4 overflow-hidden">
                        <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                            <h5 className="fw-bold">Payment Summary</h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Item Total</span>
                                <span>₹{service.price_per_hour}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                                <span className="text-muted">Taxes & Fee</span>
                                <span>₹20</span>
                            </div>
                            <div className="d-flex justify-content-between fw-bold fs-4 mb-4">
                                <span>To Pay</span>
                                <span>₹{parseFloat(service.price_per_hour) + 20}</span>
                            </div>

                            <button 
                                className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-lg"
                                onClick={handleConfirm}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>Confirm & Pay <i className="fa-solid fa-arrow-right ms-2"></i></>
                                )}
                            </button>
                            
                            <p className="text-center text-muted small mt-3 mb-0">
                                <i className="fa-solid fa-shield-halved me-1"></i> Safe & Secure Payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;