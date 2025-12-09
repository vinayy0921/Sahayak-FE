import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Get Service Data passed from Search Page
  const { service } = location.state || {};

  // --- STATE ---
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Stores the entire address object
  const [loadingAddr, setLoadingAddr] = useState(true);
  
  // Date & Time State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // --- 1. FETCH SAVED ADDRESSES ---
  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/address/get_all.php?id=${user.id}`);
        const data = await res.json();
        setAddresses(data);
        // Auto-select the first address if available
        if (data.length > 0) setSelectedAddress(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAddr(false);
      }
    };
    fetchAddresses();
  }, []);

  // --- 2. BOOKING HANDLER ---
  const handleConfirm = async () => {
    if (!date || !time) return alert("Please select Date & Time");
    if (!selectedAddress) return alert("Please select an Address");

    const payload = {
        customer_id: user.id,
        provider_id: service.provider_id,
        service_id: service.id, 
        booking_date: date,
        time_slot: time,
        address: selectedAddress.address, // We send the TEXT, not the ID (safer)
        visit_charge: 99.00 // Fixed Visit Fee
    };

    try {
        const res = await fetch(`${API_BASE_URL}user/book_service.php`, { // Ensure you have this API
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        if (data.status === 'success') {
            alert("Booking Confirmed!");
            navigate('/user/my-bookings');
        } else {
            alert(data.message || "Booking Failed");
        }
    } catch (err) {
        alert("Server Error");
    }
  };

  if (!service) return <div className="text-center py-5">Service not found. Please search again.</div>;

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* HEADER */}
      <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3 d-flex align-items-center gap-3">
        <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h5 className="m-0 fw-bold text-dark">Confirm Booking</h5>
      </div>

      <div className="container py-4">
        <div className="row g-4">
            
            {/* LEFT SIDE: DETAILS & ADDRESS */}
            <div className="col-lg-8">
                
                {/* 1. Service Summary */}
                <div className="card border-0 shadow-sm rounded-4 p-3 mb-3">
                    <div className="d-flex gap-3">
                        <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                            <i className="fa-solid fa-screwdriver-wrench fs-3"></i>
                        </div>
                        <div>
                            <h5 className="fw-bold mb-1">{service.service_name}</h5>
                            <p className="text-muted small mb-0">Provider: {service.provider_name}</p>
                            <div className="mt-1 badge bg-success bg-opacity-10 text-success">
                                Rate: ₹{service.price_per_hour}/hr
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. DATE & TIME */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                    <h6 className="fw-bold mb-3">When do you need it?</h6>
                    <div className="row g-2">
                        <div className="col-6">
                            <label className="small text-muted mb-1">Date</label>
                            <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label className="small text-muted mb-1">Time</label>
                            <select className="form-select" onChange={(e) => setTime(e.target.value)}>
                                <option value="">Select Slot</option>
                                <option>09:00 AM - 11:00 AM</option>
                                <option>11:00 AM - 01:00 PM</option>
                                <option>02:00 PM - 04:00 PM</option>
                                <option>04:00 PM - 06:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. ADDRESS SELECTION (THE NEW PART) */}
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold m-0">Select Location</h6>
                        <button 
                            className="btn btn-sm text-primary fw-bold"
                            onClick={() => navigate('/user/saved-addresses')}
                        >
                            + Add New
                        </button>
                    </div>

                    {loadingAddr ? (
                        <div className="text-center"><div className="spinner-border spinner-border-sm text-primary"></div></div>
                    ) : addresses.length === 0 ? (
                        <div className="text-center py-4 border rounded-3 border-dashed" onClick={() => navigate('/user/saved-addresses')} style={{cursor:'pointer'}}>
                            <i className="fa-solid fa-map-location-dot text-muted fs-3 mb-2"></i>
                            <p className="small text-muted m-0">No addresses found. Click to add.</p>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-2">
                            {addresses.map((addr) => (
                                <div 
                                    key={addr.id} 
                                    className={`p-3 rounded-3 border cursor-pointer d-flex align-items-center gap-3 ${selectedAddress?.id === addr.id ? 'border-primary bg-info bg-opacity-10' : 'bg-white'}`}
                                    onClick={() => setSelectedAddress(addr)}
                                    style={{cursor: 'pointer', transition: 'all 0.2s'}}
                                >
                                    <div className={`rounded-circle p-2 ${selectedAddress?.id === addr.id ? 'bg-primary text-white' : 'bg-light text-muted'}`}>
                                        <i className={`fa-solid ${addr.label === 'Home' ? 'fa-house' : addr.label === 'Office' ? 'fa-briefcase' : 'fa-location-dot'}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="fw-bold mb-0 text-dark small text-uppercase">{addr.label}</h6>
                                        <p className="small text-secondary mb-0 text-truncate" style={{maxWidth:'250px'}}>{addr.address}</p>
                                    </div>
                                    {selectedAddress?.id === addr.id && <i className="fa-solid fa-circle-check text-primary fs-5"></i>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* RIGHT SIDE: PAYMENT SUMMARY */}
            <div className="col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{top: '90px'}}>
                    <div className="card-body p-4">
                        <div className="alert alert-info small d-flex gap-2 align-items-center">
                            <i className="fa-solid fa-info-circle"></i>
                            <span>You are paying a <b>Visit Fee</b>. Final bill will be generated after service.</span>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-2">
                            {/* <span className="text-muted">Service Rate</span> */}
                            {/* <span>₹{service.price_per_hour}/hr</span> */}
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Visit/Inspection Fee</span>
                            <span className="text-success fw-bold">₹99.00</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                            <span>To Pay Now</span>
                            <span>₹99.00</span>
                        </div>

                        <button 
                            className="btn btn-dark w-100 py-3 rounded-pill fw-bold shadow-lg"
                            onClick={handleConfirm}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;