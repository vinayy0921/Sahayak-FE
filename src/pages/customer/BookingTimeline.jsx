import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const BookingTimeline = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper for Dates
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + 
           ' at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/user/get_booking_details.php?id=${id}`);
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (!booking) return <div className="text-center py-5">Booking not found</div>;

  return (
    <div className="container py-4">
      
      {/* HEADER */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle shadow-sm border p-2">
            <i className="bi bi-arrow-left"></i>
        </button>
        <h4 className="m-0 fw-bold">Booking #{booking.id}</h4>
      </div>

      {/* SERVICE SUMMARY CARD */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <div className="d-flex gap-3 align-items-center">
            <div className="bg-light p-3 rounded-3 text-center" style={{minWidth:'70px'}}>
                <h3 className="m-0 fw-bold">{new Date(booking.booking_date).getDate()}</h3>
                <small className="text-uppercase fw-bold text-muted">{new Date(booking.booking_date).toLocaleString('default', { month: 'short' })}</small>
            </div>
            <div>
                <h5 className="fw-bold mb-1">{booking.service_name}</h5>
                <p className="text-muted small mb-0">Provider: {booking.provider_name}</p>
                <span className="badge bg-primary bg-opacity-10 text-primary mt-1">{booking.status}</span>
            </div>
        </div>
      </div>

      {/* TIMELINE SECTION */}
      <h6 className="fw-bold text-secondary text-uppercase small mb-3 ms-1">Timeline History</h6>
      <div className="card border-0 shadow-sm rounded-4 p-4">
        
        {/* 1. BOOKED */}
        <TimelineItem 
            icon="bi-journal-check" 
            bg="primary" 
            title="Booking Placed" 
            date={formatDate(booking.created_at)}
            desc="You requested this service."
            isLast={false}
        />

        {/* 2. CONFIRMED (Assume auto-confirmed for now or check status) */}
        {booking.status !== 'pending' && booking.status !== 'cancelled' && (
            <TimelineItem 
                icon="bi-person-check-fill" 
                bg="info" 
                title="Provider Confirmed" 
                date="Shortly after booking" 
                desc={`${booking.provider_name} accepted your request.`}
                isLast={false}
            />
        )}

        {/* 3. COMPLETED / PAID */}
        {booking.completed_at && (
            <TimelineItem 
                icon="bi-check-circle-fill" 
                bg="success" 
                title={booking.rejection_reason ? "Job Closed (Rejected)" : "Service Completed & Paid"} 
                date={formatDate(booking.completed_at)}
                desc={booking.rejection_reason 
                    ? `You declined the bill. Reason: ${booking.rejection_reason}` 
                    : `Final Bill Paid: ₹${booking.final_amount}`}
                isLast={true}
            />
        )}

        {/* 4. CANCELLED */}
        {booking.cancelled_at && (
            <TimelineItem 
                icon="bi-x-circle-fill" 
                bg="danger" 
                title="Booking Cancelled" 
                date={formatDate(booking.cancelled_at)}
                desc="This booking was cancelled."
                isLast={true}
            />
        )}

      </div>
    </div>
  );
};

// Sub-Component for Timeline Row
const TimelineItem = ({ icon, bg, title, date, desc, isLast }) => (
    <div className="d-flex gap-3 position-relative">
        {/* Vertical Line */}
        {!isLast && (
            <div className="position-absolute" style={{
                width: '2px', background: '#e9ecef', top: '40px', bottom: '-20px', left: '20px', zIndex: 0
            }}></div>
        )}
        
        {/* Icon */}
        <div className={`rounded-circle bg-${bg} text-white d-flex align-items-center justify-content-center flex-shrink-0 position-relative`} style={{width:'40px', height:'40px', zIndex: 1}}>
            <i className={`bi ${icon}`}></i>
        </div>

        {/* Content */}
        <div className="pb-4">
            <h6 className="fw-bold mb-0 text-dark">{title}</h6>
            <small className="text-muted d-block mb-1" style={{fontSize:'0.75rem'}}>{date}</small>
            <p className="small text-secondary m-0 bg-light p-2 rounded border border-light d-inline-block">
                {desc}
            </p>
        </div>
    </div>
);

export default BookingTimeline;