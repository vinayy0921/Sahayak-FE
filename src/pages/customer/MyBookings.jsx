import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 1. Import useSearchParams
import { API_BASE_URL } from '../../config/apiConfig';

const MyBookings = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // 2. Init Params Hook
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Read tab from URL or default to 'active'
  const activeTab = searchParams.get('tab') || 'active';

  const user = JSON.parse(localStorage.getItem('user'));

  // --- FETCH DATA ---
  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/get_my_bookings.php?customer_id=${user.id}`);
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

  // --- TAB HANDLER ---
  const handleTabChange = (tab) => {
    // 4. Update URL instead of local state
    setSearchParams({ tab: tab });
  };

  // --- NAVIGATION ---
  const goToTimeline = (id) => {
    navigate(`/user/booking/${id}`);
  };

  // --- ACTIONS ---
  const handleCancel = async (e, id) => {
    e.stopPropagation(); 
    if (!window.confirm("Cancel booking?")) return;
    try {
      await fetch(`${API_BASE_URL}/user/cancel_booking.php`, {
        method: 'POST',
        body: JSON.stringify({ booking_id: id })
      });
      fetchBookings(); 
    } catch (err) { alert("Failed"); }
  };

  const handleApproveBill = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Confirm payment?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/user/approve_bill.php`, {
        method: 'POST',
        body: JSON.stringify({ booking_id: id })
      });
      const data = await res.json();
      if (data.status === 'success') {
        alert("Paid!");
        fetchBookings();
      }
    } catch (err) { alert("Error"); }
  };

  const handleRejectBill = async (e, id) => {
    e.stopPropagation();
    const reason = prompt("Reason for declining?");
    if (!reason) return;
    try {
        const res = await fetch(`${API_BASE_URL}/user/reject_bill.php`, {
            method: 'POST',
            body: JSON.stringify({ booking_id: id, reason: reason })
        });
        const data = await res.json();
        if(data.status === 'success') fetchBookings();
    } catch(err) { alert("Error"); }
  };

  // --- HELPERS ---
  const getImg = (img) => (!img) ? "https://via.placeholder.com/60" : (img.startsWith('http') ? img : `${API_BASE_URL}${img}`);

  const getStatusColor = (status) => {
    if (status === 'payment_pending') return '#dc3545';
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#0d6efd';
      case 'completed': return '#198754';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // --- FILTER & SORT LOGIC ---
  const activeList = bookings.filter(b => ['pending', 'confirmed', 'payment_pending'].includes(b.status));
  const historyList = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));

  activeList.sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date)); 
  historyList.sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date)); 

  const displayList = activeTab === 'active' ? activeList : historyList;

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .booking-card { animation: fadeInUp 0.4s ease-out forwards; background: #fff; border-radius: 16px; border: 1px solid #f0f0f0; overflow: hidden; transition: transform 0.2s; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
          .booking-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); cursor: pointer; }
          .status-strip { position: absolute; left: 0; top: 0; bottom: 0; width: 5px; }
          .date-box { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; text-align: center; padding: 8px 12px; min-width: 60px; }
          .pay-box { background: #fff5f5; border: 1px dashed #dc3545; border-radius: 12px; padding: 15px; margin-top: 15px; }
        `}
      </style>

      <div className="container pb-5 mt-4">
        
        {/* HEADER & TOGGLE */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className="mb-3 mb-md-0">
            <h3 className="fw-bold text-dark m-0">My Bookings</h3>
            <p className="text-muted small m-0">Track your service status</p>
          </div>
          
          {/* THE TOGGLE BUTTONS (Updated to use handleTabChange) */}
          <div className="bg-light p-1 rounded-pill d-flex border">
            <button 
                className={`btn btn-sm rounded-pill px-4 fw-bold ${activeTab === 'active' ? 'bg-white shadow-sm text-dark' : 'text-muted'}`} 
                onClick={() => handleTabChange('active')}
            >
                Upcoming
            </button>
            <button 
                className={`btn btn-sm rounded-pill px-4 fw-bold ${activeTab === 'history' ? 'bg-white shadow-sm text-dark' : 'text-muted'}`} 
                onClick={() => handleTabChange('history')}
            >
                History
            </button>
          </div>
        </div>

        {/* LOADING & EMPTY STATES */}
        {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
        
        {!loading && displayList.length === 0 && (
            <div className="text-center py-5 opacity-50">
                <i className="bi bi-calendar-x display-1 text-muted"></i>
                <p className="mt-3">No {activeTab} bookings found.</p>
            </div>
        )}

        {/* LIST */}
        <div className="row g-4">
          {displayList.map((item, index) => (
            <div className="col-12 col-lg-6" key={item.booking_id}>
              
              <div 
                className="booking-card p-3 ps-4 h-100" 
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => goToTimeline(item.booking_id)} 
              >
                <div className="status-strip" style={{ backgroundColor: getStatusColor(item.status) }}></div>

                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="badge text-uppercase mb-2" style={{ color: getStatusColor(item.status), background: getStatusColor(item.status) + '15' }}>
                      {item.status.replace('_', ' ')}
                    </span>
                    <h5 className="fw-bold text-dark m-0">{item.service_name}</h5>
                    <p className="text-muted small mb-0">Order #{item.booking_id}</p>
                  </div>
                  <div className="date-box">
                    <h5 className="mb-0 fw-bold text-dark">{new Date(item.booking_date).getDate()}</h5>
                    <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.65rem' }}>
                      {new Date(item.booking_date).toLocaleString('default', { month: 'short' })}
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mb-3 bg-light p-2 rounded-3">
                  <img src={getImg(item.profile_img)} className="rounded-circle bg-white border" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Pro" />
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-bold text-dark small">{item.provider_name}</p>
                    <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>
                      <i className="bi bi-clock me-1"></i> {item.time_slot}
                    </small>
                  </div>
                  <div className="text-end pe-2">
                    <span className="fw-bold text-primary fs-6">
                      ₹{item.final_amount > 0 ? item.final_amount : item.price_per_hour}
                    </span>
                  </div>
                </div>

                {item.status === 'payment_pending' ? (
                  <div className="pay-box" onClick={(e) => e.stopPropagation()}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold text-danger m-0">Bill Generated</h6>
                      <span className="badge bg-danger">Pay Now</span>
                    </div>
                    <p className="small text-muted mb-3 fst-italic">"{item.bill_description}"</p>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-danger btn-sm flex-fill fw-bold bg-white" onClick={(e) => handleRejectBill(e, item.booking_id)}>Decline</button>
                      <button className="btn btn-dark btn-sm flex-fill fw-bold shadow-sm" onClick={(e) => handleApproveBill(e, item.booking_id)}>Pay & Close</button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex gap-2 pt-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                    {['pending', 'confirmed'].includes(item.status) && (
                      <a href={`tel:${item.provider_phone}`} className="btn btn-outline-secondary btn-sm flex-fill rounded-pill fw-medium">
                        <i className="bi bi-telephone-fill me-1"></i> Call
                      </a>
                    )}
                    {item.status === 'pending' && (
                      <button className="btn btn-light text-danger btn-sm flex-fill rounded-pill fw-medium border-0" onClick={(e) => handleCancel(e, item.booking_id)}>
                        Cancel
                      </button>
                    )}
                    {item.status === 'completed' && (
                      <button className="btn btn-warning text-dark btn-sm flex-fill rounded-pill fw-bold">
                        <i className="bi bi-star-fill me-1"></i> Rate
                      </button>
                    )}
                    {item.status === 'cancelled' && (
                      <button className="btn btn-light text-muted btn-sm flex-fill rounded-pill disabled border">
                        Cancelled
                      </button>
                    )}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookings;