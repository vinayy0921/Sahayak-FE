import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const ProviderDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper for images
  const getImg = (img) => (!img || img.includes('default')) 
    ? `https://ui-avatars.com/api/?name=${provider?.name || 'User'}&background=random` 
    : (img.startsWith('http') ? img : `../images/cleaner.png`);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 1. Fetch Provider Basic Info
        const resProv = await fetch(`${API_BASE_URL}user/get_provider_details.php?id=${id}`);
        const dataProv = await resProv.json();
        setProvider(dataProv);

        // 2. Fetch Services offered by this Provider
        const resServ = await fetch(`${API_BASE_URL}user/get_provider_services.php?provider_id=${id}`);
        const dataServ = await resServ.json();
        setServices(dataServ);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBookService = (service) => {
    // Pass specific service details to booking page
    navigate('/user/book-service', { 
        state: { service: { ...service, provider_name: provider.name, provider_img: provider.profile_img } } 
    });
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (!provider) return <div className="text-center py-5">Provider Not Found</div>;

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* --- HEADER IMAGE --- */}
      <div className="position-relative" style={{height:'200px', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'}}>
        <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle position-absolute top-0 start-0 m-3 shadow-sm">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      {/* --- PROFILE INFO CARD --- */}
      <div className="container" style={{marginTop: '-60px'}}>
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <div className="d-flex align-items-end mb-3" style={{marginTop: '-60px'}}>
                <img src={getImg(provider.profile_img)} alt="Pro" className="rounded-circle border border-4 border-white shadow-sm" style={{width:'100px', height:'100px', objectFit:'cover', background:'#fff'}} />
            </div>
            
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h4 className="fw-bold mb-1">{provider.name} {provider.is_verified == 1 && <i className="fa-solid fa-circle-check text-primary small"></i>}</h4>
                    <p className="text-muted small mb-2"><i className="fa-solid fa-location-dot me-1"></i> {provider.city}</p>
                    <div className="badge bg-warning text-dark"><i className="fa-solid fa-star"></i> 4.8 Rating</div>
                </div>
                <div className="text-end">
                    <span className="d-block fw-bold fs-5">{provider.experience_years}+ Years</span>
                    <small className="text-muted">Experience</small>
                </div>
            </div>

            <hr className="my-3 opacity-10"/>
            
            <h6 className="fw-bold text-uppercase small text-muted mb-2">About</h6>
            <p className="small text-secondary mb-0">
                {provider.bio || "No bio available."}
            </p>
        </div>

        {/* --- SERVICES LIST --- */}
        <h5 className="fw-bold mb-3">Services Offered ({services.length})</h5>
        <div className="row g-3">
            {services.map(service => (
                <div className="col-12" key={service.id}>
                    <div className="card border-0 shadow-sm rounded-4 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">{service.service_name}</h6>
                                <p className="text-muted small mb-0 text-truncate" style={{maxWidth:'200px'}}>{service.description}</p>
                                <div className="mt-2 text-primary fw-bold">₹{service.price_per_hour}/hr</div>
                            </div>
                            <button onClick={() => handleBookService(service)} className="btn btn-sm btn-dark rounded-pill px-4">Book</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ProviderDetails;