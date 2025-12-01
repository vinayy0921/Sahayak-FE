// src/pages/user/ProfilePage.jsx
import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';

const ProfilePage = () => {
  // Load initial data from localstorage or API
  const user = JSON.parse(localStorage.getItem('user')) || {};
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: '9876543210', // Dummy
    address: 'Adajan, Surat' // Dummy
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile Updated (Logic to be added)");
  };

  return (
    <>
      <UserNavbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white fw-bold py-3">Edit Profile</div>
              <div className="card-body p-4">
                <form onSubmit={handleSave}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email (Read Only)</label>
                    <input type="email" className="form-control bg-light" value={formData.email} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea name="address" className="form-control" rows="3" value={formData.address} onChange={handleChange}></textarea>
                  </div>
                  <button className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;