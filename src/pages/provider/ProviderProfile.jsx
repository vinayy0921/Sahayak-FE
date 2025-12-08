import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderBottomNav from '../../components/ProviderBottomNav';
import { API_BASE_URL } from '../../config/apiConfig';

const ProviderProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showEdit, setShowEdit] = useState(false);
  
  // Edit State
  const [formData, setFormData] = useState({
    name: user.name,
    experience_years: user.experience_years || 0,
    bio: user.bio || ''
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Call backend API (Create api/provider/update_profile.php similar to customer)
    const res = await fetch(`${API_BASE_URL}provider/update_profile.php`, {
        method: 'POST',
        body: JSON.stringify({ ...formData, id: user.id })
    });
    const data = await res.json();
    if(data.status === 'success') {
        const updated = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updated));
        setUser(updated);
        setShowEdit(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* HEADER BANNER */}
      <div className="position-relative" style={{height:'180px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'}}>
      </div>

      <div className="container" style={{marginTop: '-60px'}}>
        
        {/* PROFILE CARD */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 text-center">
            <div className="d-inline-block p-1 bg-white rounded-circle mx-auto mb-2" style={{marginTop:'-60px'}}>
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold display-4" style={{width:'100px', height:'100px'}}>
                    {user.name.charAt(0)}
                </div>
            </div>
            
            <h4 className="fw-bold m-0">{user.name}</h4>
            <p className="text-muted small mb-2">{user.profession}</p>
            
            {user.is_verified == 1 ? 
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">Verified Pro</span> :
                <span className="badge bg-warning text-dark rounded-pill px-3">Verification Pending</span>
            }

            <div className="d-flex justify-content-center gap-4 mt-4 border-top pt-3">
                <div>
                    <h5 className="fw-bold m-0">{user.experience_years}+</h5>
                    <small className="text-muted">Years Exp.</small>
                </div>
                <div>
                    <h5 className="fw-bold m-0">4.8</h5>
                    <small className="text-muted">Rating</small>
                </div>
            </div>
        </div>

        {/* BIO SECTION */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <div className="d-flex justify-content-between mb-2">
                <h6 className="fw-bold text-dark">About Me</h6>
                <button className="btn btn-link p-0 text-decoration-none small" onClick={() => setShowEdit(true)}>Edit</button>
            </div>
            <p className="text-secondary small mb-0">
                {user.bio || "Add a bio to tell customers about your expertise."}
            </p>
        </div>

        {/* MENU */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3">
                    <i className="bi bi-gear-fill text-secondary"></i> Manage Services
                </button>
                <button className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3">
                    <i className="bi bi-bank2 text-success"></i> Bank Details
                </button>
                <button onClick={handleLogout} className="list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 text-danger">
                    <i className="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>
        </div>

      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed-top w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" style={{zIndex:1060}}>
            <div className="bg-white rounded-4 p-4 w-100" style={{maxWidth:'400px'}}>
                <h5 className="fw-bold mb-3">Edit Profile</h5>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="small text-muted">Name</label>
                        <input type="text" className="form-control" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="small text-muted">Experience (Years)</label>
                        <input type="number" className="form-control" value={formData.experience_years} onChange={(e)=>setFormData({...formData, experience_years:e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="small text-muted">Bio</label>
                        <textarea className="form-control" rows="3" value={formData.bio} onChange={(e)=>setFormData({...formData, bio:e.target.value})}></textarea>
                    </div>
                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-light flex-fill" onClick={() => setShowEdit(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary flex-fill">Save</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <ProviderBottomNav />
    </div>
  );
};

export default ProviderProfile;