import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config/apiConfig';

const ProviderSchedule = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  // --- FETCH SCHEDULE ---
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // We reuse the dashboard logic or create a specific endpoint
        const res = await fetch(`${API_BASE_URL}provider/get_provider_dashboard.php?provider_id=${user.id}`);
        const data = await res.json();
        // We only want 'confirmed' jobs for the schedule
        setJobs(data.upcoming || []); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  // --- ACTIONS ---
  const handleComplete = async (id) => {
    if(!window.confirm("Mark this job as completed?")) return;
    await fetch(`${API_BASE_URL}provider/update_booking_status.php`, {
        method: 'POST',
        body: JSON.stringify({ booking_id: id, status: 'completed' })
    });
    window.location.reload(); // Simple reload to refresh list
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* HEADER */}
      <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3">
        <h5 className="m-0 fw-bold text-dark">My Schedule</h5>
        <p className="text-muted small m-0">Your upcoming appointments</p>
      </div>

      <div className="container py-4">
        
        {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}

        {!loading && jobs.length === 0 && (
            <div className="text-center py-5 opacity-50">
                <i className="bi bi-calendar-check display-1"></i>
                <p className="mt-3">No upcoming jobs.</p>
            </div>
        )}

        <div className="d-flex flex-column gap-3">
            {jobs.map((job) => (
                <div key={job.id} className="card border-0 shadow-sm rounded-4 overflow-hidden animate-up">
                    <div className="d-flex">
                        {/* Left Color Strip */}
                        <div className="bg-primary" style={{width: '6px'}}></div>
                        
                        <div className="p-3 w-100">
                            {/* Time & Date */}
                            <div className="d-flex justify-content-between mb-2">
                                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                                    <i className="bi bi-clock me-1"></i> {job.time_slot}
                                </span>
                                <small className="fw-bold text-secondary">
                                    {new Date(job.booking_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                </small>
                            </div>

                            {/* Customer Info */}
                            <h6 className="fw-bold text-dark mb-1">{job.customer_name}</h6>
                            <p className="text-muted small mb-2"><i className="bi bi-geo-alt-fill text-danger me-1"></i> {job.address}</p>
                            <div className="bg-light p-2 rounded-2 small text-muted mb-3">
                                Service: <span className="fw-bold text-dark">{job.service_name}</span>
                            </div>

                            {/* Actions */}
                            <div className="d-flex gap-2">
                                <a href={`tel:${job.phone}`} className="btn btn-outline-dark btn-sm flex-fill rounded-pill">
                                    <i className="bi bi-telephone-fill"></i> Call
                                </a>
                                <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="btn btn-outline-primary btn-sm flex-fill rounded-pill"
                                >
                                    <i className="bi bi-map-fill"></i> Map
                                </a>
                                <button 
                                    className="btn btn-success btn-sm flex-fill rounded-pill fw-bold text-white"
                                    onClick={() => handleComplete(job.id)}
                                >
                                    Complete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>

    </div>
  );
};

export default ProviderSchedule;