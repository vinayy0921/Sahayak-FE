import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { API_BASE_URL } from '../../config/apiConfig';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  // --- STATE ---
  const [data, setData] = useState({ stats: {}, requests: [], upcoming: [], service_count: 0 });
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  
  // Modal State
  const [showBillModal, setShowBillModal] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [billData, setBillData] = useState({ amount: '', description: '' });

  // --- FETCH DATA ---
  const fetchDashboard = async () => {
    try {
        // console.log("Fetching dashboard for provider:", user.id);
      const res = await fetch(`${API_BASE_URL}provider/get_provider_dashboard.php?provider_id=${user.id}`);
      const result = await res.json();
      
      // OPTIONAL: Fetch service count separately if not in dashboard API
      // const resServ = await fetch(`${API_BASE_URL}provider/get_my_services.php?id=${user.id}`);
      // const servData = await resServ.json();
      
      // For now, we assume dashboard API sends everything or we default to 0
      setData({ ...result, service_count: result.service_count || 0 }); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'provider') navigate('/login');
    else fetchDashboard();
  }, []);

  // --- NAVIGATION HANDLERS ---
  const goToServices = () => navigate('/provider/services');

  // --- ACTIONS ---
  const handleAction = async (id, status) => {
    const newRequests = data.requests.filter(r => r.id !== id);
    setData({ ...data, requests: newRequests });

    try {
        await fetch(`${API_BASE_URL}provider/update_booking_status.php`, {
            method: 'POST',
            body: JSON.stringify({ booking_id: id, status: status })
        });
        fetchDashboard();
    } catch (error) {
        alert("Action failed");
    }
  };

  const submitBill = async () => {
    if(!billData.amount || !billData.description) {
        alert("Please fill details");
        return;
    }
    try {
        const res = await fetch(`${API_BASE_URL}provider/generate_bill.php`, {
            method: 'POST',
            body: JSON.stringify({ booking_id: currentJobId, ...billData })
        });
        const result = await res.json();
        if(result.status === 'success') {
            setShowBillModal(false);
            setBillData({ amount: '', description: '' }); 
            alert("Bill Sent!");
            fetchDashboard();
        }
    } catch (err) { alert("Error sending bill"); }
  };

  // Helper
  const getImg = (img) => (!img) ? "https://via.placeholder.com/60" : (img.startsWith('http') ? img : `${API_BASE_URL}${img}`);

  return (
    <>
      <style>
        {`
          /* --- PRO CARD (Earnings) --- */
          .earnings-card {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
            color: white;
            border-radius: 20px;
            position: relative; overflow: hidden;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
            height: 100%;
          }
          
          /* --- SERVICE CARD (New Feature) --- */
          .service-status-card {
            background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
            color: white;
            border-radius: 20px;
            position: relative; overflow: hidden;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
            cursor: pointer; transition: transform 0.2s;
            height: 100%;
          }
          .service-status-card:active { transform: scale(0.98); }
          .service-icon-bg {
            position: absolute; right: -20px; bottom: -20px;
            font-size: 6rem; opacity: 0.2; color: white;
          }

          /* --- TICKET CARD --- */
          .ticket-card {
            background: #fff; border-radius: 16px; border: 1px solid #f1f5f9;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            position: relative; overflow: hidden;
          }
          .ticket-strip {
            position: absolute; left: 0; top: 0; bottom: 0; width: 5px;
            background: #F59E0B;
          }

          /* --- SCHEDULE --- */
          .timeline-row {
            display: flex; gap: 15px; margin-bottom: 15px;
          }
          .timeline-time {
            min-width: 60px; text-align: right;
            font-weight: bold; color: #64748B; font-size: 0.85rem;
            padding-top: 5px;
          }
          .timeline-content {
            background: #fff; border-radius: 16px; border: 1px solid #f1f5f9;
            padding: 15px; flex-grow: 1; position: relative;
          }
          .timeline-content::before {
            content: ''; position: absolute; left: -20px; top: 15px;
            width: 10px; height: 10px; border-radius: 50%;
            background: #2563EB; border: 2px solid #F8FAFC;
          }
        `}
      </style>

      <div className="bg-light min-vh-100 pb-5">
        
        {/* --- HEADER --- */}
        <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
                <Link to="/provider/profile">
                    <img src={getImg(user.profile_img)} className="rounded-circle border" style={{width:'45px', height:'45px', objectFit:'cover'}} alt="Profile" />
                </Link>
                <div>
                    <h6 className="m-0 fw-bold text-dark lh-1">Hello, {user.name}</h6>
                    <small className="text-muted">Pro Dashboard</small>
                </div>
            </div>
            
            {/* Status Toggle */}
            <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill border">
                <span className={`small fw-bold me-2 ${isOnline ? 'text-success' : 'text-muted'}`}>{isOnline ? 'Online' : 'Away'}</span>
                <div className="form-check form-switch m-0 min-h-auto">
                    <input className="form-check-input mt-1" type="checkbox" checked={isOnline} onChange={() => setIsOnline(!isOnline)} style={{cursor:'pointer'}} />
                </div>
            </div>
        </div>

        <div className="container py-4">
            
            {/* --- TOP ROW: EARNINGS & SERVICES --- */}
            <div className="row g-3 mb-4">
                
                {/* 1. Earnings Card */}
                <div className="col-12 col-md-7">
                    <div className="earnings-card p-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <div>
                                <small className="text-white-50 text-uppercase fw-bold ls-1" style={{fontSize:'0.7rem'}}>Total Earnings</small>
                                <h1 className="fw-bold m-0 mt-1">₹{data.stats.total_earnings || 0}</h1>
                            </div>
                            <div className="text-end">
                                <h4 className="m-0 fw-bold">{data.stats.total_jobs || 0}</h4>
                                <small className="text-white-50" style={{fontSize:'0.75rem'}}>Jobs Completed</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. SERVICES CARD (The fix you requested) */}
                <div className="col-12 col-md-5">
                    <div className="service-status-card p-4 d-flex flex-column justify-content-between" onClick={goToServices}>
                        <i className="bi bi-tools service-icon-bg"></i>
                        <div>
                            <h5 className="fw-bold m-0">My Services</h5>
                            <p className="small opacity-75 mb-0">Manage prices & offerings</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <span className="badge bg-white text-primary fw-bold px-3">Active</span>
                            <div className="btn btn-sm btn-outline-light rounded-pill px-3">Manage &rarr;</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* --- 3. PENDING REQUESTS --- */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-dark m-0">Incoming Requests</h6>
                {data.requests.length > 0 && <span className="badge bg-danger rounded-pill animate-pulse">{data.requests.length} New</span>}
            </div>

            {data.requests.length === 0 ? (
                <div className="text-center py-4 bg-white border rounded-4 mb-4 border-dashed text-muted">
                    <small>No pending requests.</small>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3 mb-4">
                    {data.requests.map(req => (
                        <div key={req.id} className="ticket-card p-3 ps-4">
                            <div className="ticket-strip"></div>
                            
                            <div className="d-flex justify-content-between mb-1">
                                <h6 className="fw-bold m-0 text-dark">{req.service_name}</h6>
                                <span className="fw-bold text-success">₹{req.price_per_hour}</span>
                            </div>
                            <p className="text-muted small mb-2 text-truncate">
                                <i className="bi bi-geo-alt-fill text-danger me-1"></i> {req.address}
                            </p>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-light text-danger flex-fill btn-sm fw-bold" onClick={() => handleAction(req.id, 'cancelled')}>Reject</button>
                                <button className="btn btn-dark flex-fill btn-sm fw-bold" onClick={() => handleAction(req.id, 'confirmed')}>Accept</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- 4. TIMELINE (UPCOMING) --- */}
            <h6 className="fw-bold text-dark mb-3 mt-4">Today's Schedule</h6>
            
            {data.upcoming.length === 0 ? (
                <div className="text-center py-5 opacity-50">
                    <i className="bi bi-calendar-check display-4 text-muted"></i>
                    <p className="small mt-2 text-muted">All clear for today.</p>
                </div>
            ) : (
                <div className="schedule-list">
                    {data.upcoming.map(job => (
                        <div key={job.id} className="timeline-row">
                            <div className="timeline-time">{job.time_slot.split(' ')[0]}</div>
                            <div className="timeline-content shadow-sm">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">{job.customer_name}</h6>
                                        <p className="text-muted small mb-0"><i className="bi bi-geo-alt me-1"></i> {job.address}</p>
                                    </div>
                                    <button 
                                        className="btn btn-success btn-sm rounded-pill px-3 fw-bold"
                                        onClick={() => { setCurrentJobId(job.id); setShowBillModal(true); }}
                                    >
                                        Bill
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
      </div>

      {/* === BILL MODAL (Same as before) === */}
      {showBillModal && (
        <div className="modal d-block" style={{background: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Create Invoice</h5>
                <button type="button" className="btn-close" onClick={() => setShowBillModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-light border border-dashed d-flex gap-2 align-items-center p-2 mb-3 mt-2">
                    <i className="bi bi-info-circle-fill text-primary"></i>
                    <small className="text-muted">Visit Charge of <b>₹99</b> is included.</small>
                </div>
                
                <label className="form-label small fw-bold text-muted">Final Amount</label>
                <div className="input-group mb-3">
                    <span className="input-group-text bg-white border-end-0 fw-bold">₹</span>
                    <input type="number" className="form-control border-start-0 ps-0" placeholder="e.g. 550" onChange={(e) => setBillData({...billData, amount: e.target.value})} />
                </div>

                <label className="form-label small fw-bold text-muted">Work Description</label>
                <textarea className="form-control mb-4" rows="3" placeholder="Details of repair..." onChange={(e) => setBillData({...billData, description: e.target.value})}></textarea>
                
                <button className="btn btn-primary w-100 py-2 rounded-pill fw-bold" onClick={submitBill}>Send Bill</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProviderDashboard;