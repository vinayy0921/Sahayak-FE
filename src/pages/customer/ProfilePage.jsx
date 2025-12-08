import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/ProfilePage.css';
import { API_BASE_URL } from '../../config/apiConfig';

const ProfilePage = () => {
  const navigate = useNavigate();

  // --- 1. STATE MANAGEMENT ---
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Modals State
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);


  // Edit Form Data
  const [editFormData, setEditFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '' // Keeping this as 'Primary Address'
  });

  // Photo Upload Data
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Helper to fix image path
  const getProfileImage = (imgStr) => {
    if (!imgStr) return `https://ui-avatars.com/api/?name=${user.name}&background=0D6EFD&color=fff&size=150`; 
    return imgStr.startsWith('http') ? imgStr : `${API_BASE_URL}${imgStr}`; 
  };

  // --- 2. LOGOUT LOGIC ---
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      localStorage.removeItem('recentSearches');
      navigate('/login');
    }
  };

  // --- 3. ADDRESS LOGIC (NEW FEATURE) ---




  // --- 4. EDIT PROFILE LOGIC (EXISTING) ---
  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const submitEditProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/user/update_profile.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editFormData, id: user.id })
      });
      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setShowEditModal(false);
        alert("Profile Updated Successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Update Failed. Check Console.");
    }
  };

  // --- 5. PHOTO UPLOAD LOGIC (EXISTING) ---
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitProfilePic = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('id', user.id);

    try {
      setUploading(true);
      const response = await fetch(`${API_BASE_URL}/user/upload_profile_pic.php`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.status === 'success') {
        const updatedUser = { ...user, profile_img: data.image_url };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setShowPicModal(false);
        alert("Photo Updated!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload Error");
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <>
      <div className="container mt-2 pb-5">

        {/* --- SECTION 1: PROFILE HEADER --- */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
          <div className="profile-banner"></div>

          <div className="card-body text-center pt-0">
            {/* Avatar & Camera Button */}
            <div className="profile-avatar-container">
              <img
                src={getProfileImage(user.profile_img)}
                alt="Profile"
                className="rounded-circle profile-avatar"
              />
              <button
                className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 border border-white"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setShowPicModal(true)}
              >
                <i className="fa-solid fa-camera small"></i>
              </button>
            </div>

            <h4 className="fw-bold mb-1">{user.name}</h4>
            <p className="text-muted small mb-3">
              {user.email} • {user.phone || "No Phone"}
            </p>

            <button
              className="btn btn-outline-primary rounded-pill px-4 btn-sm"
              onClick={() => setShowEditModal(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* --- SECTION 2: QUICK STATS --- */}
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="fa-solid fa-wallet fs-5"></i>
                </div>
                <div>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Wallet</small>
                  <h5 className="fw-bold m-0">₹450</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="fa-solid fa-calendar-check fs-5"></i>
                </div>
                <div>
                  <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Bookings</small>
                  <h5 className="fw-bold m-0">12</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: ACCOUNT MENU --- */}
        <h6 className="text-muted text-uppercase small fw-bold ms-2 mb-3">Account Settings</h6>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="list-group list-group-flush">

            <Link to="/user/my-bookings" className="profile-menu-item">
              <i className="fa-regular fa-calendar-check text-primary"></i>
              <span className="fw-medium">My Bookings</span>
              <i className="fa-solid fa-chevron-right ms-auto text-muted small"></i>
            </Link>

            {/* --- UPDATED: JUST A LINK NOW --- */}
            <Link to="/user/saved-addresses" className="profile-menu-item">
              <i className="fa-solid fa-map-location-dot text-info"></i>
              <span className="fw-medium">Manage Addresses</span>
              <i className="fa-solid fa-chevron-right ms-auto text-muted small"></i>
            </Link>

            <Link to="/user/wallet" className="profile-menu-item">
              <i className="fa-solid fa-credit-card text-success"></i>
              <span className="fw-medium">Payment Methods</span>
              <i className="fa-solid fa-chevron-right ms-auto text-muted small"></i>
            </Link>

          </div>
        </div>

        {/* --- SECTION 4: SUPPORT MENU --- */}
        <h6 className="text-muted text-uppercase small fw-bold ms-2 mb-3">Support & More</h6>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="list-group list-group-flush">

            <Link to="/user/help" className="profile-menu-item">
              <i className="fa-solid fa-headset text-warning"></i>
              <span className="fw-medium">Help & Support</span>
              <i className="fa-solid fa-chevron-right ms-auto text-muted small"></i>
            </Link>

            <Link to="/user/privacy" className="profile-menu-item">
              <i className="fa-solid fa-shield-halved text-secondary"></i>
              <span className="fw-medium">Privacy Policy</span>
              <i className="fa-solid fa-chevron-right ms-auto text-muted small"></i>
            </Link>

            <button onClick={handleLogout} className="profile-menu-item text-danger w-100 text-start border-0 bg-transparent">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="fw-bold">Logout</span>
            </button>

          </div>
        </div>

        <div className="text-center text-muted small opacity-50 mb-5">
          SAHAYAK v1.0.0 <br />
          Made with ❤️ in Surat
        </div>

      </div>

      {/* ================= MODAL 1: EDIT PROFILE ================= */}
      {showEditModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitEditProfile}>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Full Name</label>
                    <input type="text" name="name" className="form-control" value={editFormData.name} onChange={handleEditChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" value={editFormData.phone} onChange={handleEditChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted">Primary Address</label>
                    <textarea name="address" className="form-control" rows="3" value={editFormData.address} onChange={handleEditChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 rounded-pill">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: UPDATE PROFILE PIC ================= */}
      {showPicModal && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Update Photo</h5>
                <button type="button" className="btn-close" onClick={() => setShowPicModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <div className="mb-4">
                  {selectedFile ? (
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ) : (
                    <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                      <i className="fa-solid fa-image text-muted fs-1"></i>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" className="form-control mb-3" onChange={handleFileChange} />
                <button
                  onClick={submitProfilePic}
                  className="btn btn-dark w-100 rounded-pill"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Update Photo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


     

    </>
  );
};

export default ProfilePage;