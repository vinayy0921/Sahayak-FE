import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); 

  const user = JSON.parse(localStorage.getItem('user'));

  // --- FETCH DATA ---
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}user/get_my_bookings.php?customer_id=${user.id}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchBookings();
  }, []);

  // --- CANCEL HANDLER ---
  const handleCancel = async (id) => {
    if(!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
        const res = await fetch(`${API_BASE_URL}user/cancel_booking.php`, {
            method: 'POST',
            body: JSON.stringify({ booking_id: id })
        });
        const data = await res.json();
        if(data.status === 'success') {
            fetchBookings(); 
        }
    } catch (err) {
        alert("Failed to cancel");
    }
  };

  // --- FILTER LOGIC ---
  const activeBookings = bookings.filter(b => ['pending', 'confirmed'].includes(b.status));
  const historyBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));
  const displayList = activeTab === 'active' ? activeBookings : historyBookings;

  // --- HELPERS ---
  const getImg = (img) => (!img) ? "https://via.placeholder.com/60" : (img.startsWith('http') ? img : `${API_BASE_URL}${img}`);

  // Returns the color code for the status strip
  const getStatusColor = (status) => {
    switch(status) {
        case 'pending': return '#ffc107'; // Yellow
        case 'confirmed': return '#0d6efd'; // Blue
        case 'completed': return '#198754'; // Green
        case 'cancelled': return '#dc3545'; // Red
        default: return '#6c757d';
    }
  };

  return (
    <>
      <style>
        {`
          /* Smooth Fade In */
          @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
          .animate-card { animation: slideUp 0.4s ease-out forwards; }

          /* Modern Ticket Card */
          .booking-card {
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #f0f0f0;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
          }
          .booking-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          }
          
          /* The Colored Strip on Left */
          .status-strip {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 6px;
          }

          /* Floating Tab Switcher */
          .tab-container {
            background: #e9ecef;
            padding: 5px;
            border-radius: 50px;
            display: inline-flex;
            position: relative;
          }
          .tab-btn {
            border: none;
            background: transparent;
            padding: 8px 24px;
            border-radius: 50px;
            font-weight: 600;
            color: #6c757d;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
          }
          .tab-btn.active {
            background: #fff;
            color: #0d6efd;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
        `}
      </style>

      <div className="container mt-2 pb-5">
        
        {/* HEADER AREA */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
          <div className="mb-3 mb-md-0">
            <h3 className="fw-bold text-dark m-0">My Bookings</h3>
            <p className="text-muted small m-0">Manage your upcoming & past services</p>
          </div>
          
          {/* Modern Tabs */}
          <div className="tab-container">
            <button 
                className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
            >
                Upcoming
            </button>
            <button 
                className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
            >
                History
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2 small">Syncing bookings...</p>
            </div>
        )}

        {/* EMPTY STATE */}
        {!loading && displayList.length === 0 && (
            <div className="text-center py-5 animate-card">
                <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                    <i className="fa-regular fa-calendar-xmark display-4 text-secondary opacity-50"></i>
                </div>
                <h5 className="fw-bold text-muted">No {activeTab} bookings</h5>
                <p className="text-secondary small">Looks like you haven't booked anything yet.</p>
                {activeTab === 'active' && (
                    <button className="btn btn-primary rounded-pill px-4 mt-2" onClick={() => navigate('/user/search')}>
                        Find a Service
                    </button>
                )}
            </div>
        )}

        {/* BOOKING LIST */}
        <div className="row g-4">
            {displayList.map((item, index) => (
                <div className="col-lg-6" key={item.booking_id}>
                    <div className="booking-card shadow-sm animate-card" style={{animationDelay: `${index * 50}ms`}}>
                        
                        {/* Status Strip (Color Code) */}
                        <div className="status-strip" style={{ backgroundColor: getStatusColor(item.status) }}></div>

                        <div className="p-4 ps-4"> 
                            {/* Header: Date & Status Text */}
                            <div className="d-flex justify-content-between align-items-start mb-3 ps-2">
                                <div>
                                    <h6 className="fw-bold text-uppercase text-muted small mb-1" style={{letterSpacing:'1px'}}>
                                        {item.status}
                                    </h6>
                                    <h5 className="fw-bold text-dark mb-0">{item.service_name}</h5>
                                </div>
                                <div className="text-end bg-light p-2 rounded-3 border">
                                    <h6 className="mb-0 fw-bold">{new Date(item.booking_date).getDate()}</h6>
                                    <small className="text-uppercase fw-bold text-muted" style={{fontSize: '0.65rem'}}>
                                        {new Date(item.booking_date).toLocaleString('default', { month: 'short' })}
                                    </small>
                                </div>
                            </div>

                            {/* Body: Provider Info */}
                            <div className="d-flex align-items-center gap-3 ps-2 mb-4">
                                <img 
                                    src={getImg(item.profile_img)} 
                                    className="rounded-circle border" 
                                    style={{width:'50px', height:'50px', objectFit:'cover'}} 
                                    alt="Pro"
                                />
                                <div>
                                    <p className="mb-0 fw-medium text-dark">{item.provider_name}</p>
                                    <small className="text-muted">
                                        <i className="fa-regular fa-clock me-1"></i> {item.time_slot}
                                    </small>
                                </div>
                                <div className="ms-auto">
                                    <span className="fw-bold text-primary fs-5">₹{item.price_per_hour}</span>
                                </div>
                            </div>

                            {/* Footer: Actions */}
                            <div className="d-flex gap-2 ps-2 pt-3 border-top">
                                {['pending', 'confirmed'].includes(item.status) && (
                                    <a href={`tel:${item.provider_phone}`} className="btn btn-outline-dark btn-sm flex-fill rounded-pill">
                                        <i className="fa-solid fa-phone me-2"></i> Call
                                    </a>
                                )}

                                {item.status === 'pending' && (
                                    <button 
                                        className="btn btn-danger btn-sm flex-fill rounded-pill bg-opacity-10 text-danger border-0 fw-bold"
                                        onClick={() => handleCancel(item.booking_id)}
                                    >
                                        Cancel Request
                                    </button>
                                )}

                                {item.status === 'confirmed' && (
                                    <button className="btn btn-primary btn-sm flex-fill rounded-pill">
                                        View Details
                                    </button>
                                )}

                                {item.status === 'completed' && (
                                    <button className="btn btn-warning text-dark btn-sm flex-fill rounded-pill fw-bold">
                                        <i className="fa-regular fa-star me-2"></i> Rate Service
                                    </button>
                                )}
                                
                                {item.status === 'cancelled' && (
                                    <button className="btn btn-light text-muted btn-sm flex-fill rounded-pill disabled">
                                        Cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </>
  );
};

export default MyBookings;