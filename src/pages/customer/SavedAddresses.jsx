import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const SavedAddresses = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });

  // --- FETCH ADDRESSES ---
  const fetchAddresses = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}user/address/get_all.php?id=${user.id}`);
      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchAddresses();
  }, []);

  // --- SAVE ADDRESS ---
  const handleSave = async (e) => {
    e.preventDefault();
    if(!newAddress.address) return alert("Address is required");

    try {
      await fetch(`${API_BASE_URL}user/address/add.php`, {
        method: 'POST',
        body: JSON.stringify({
          customer_id: user.id,
          label: newAddress.label || 'Home',
          address: newAddress.address
        })
      });
      setNewAddress({ label: '', address: '' });
      setShowAddForm(false);
      fetchAddresses(); // Refresh list
    } catch (err) {
      alert("Failed to save");
    }
  };

  // --- DELETE ADDRESS ---
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this address?")) return;
    try {
      await fetch(`${API_BASE_URL}/user/address/delete.php`, {
        method: 'POST',
        body: JSON.stringify({ address_id: id })
      });
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      
      {/* HEADER */}
      <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3 d-flex align-items-center gap-3">
        <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h5 className="m-0 fw-bold text-dark">Saved Locations</h5>
      </div>

      <div className="container py-4">

        {/* ADD NEW BUTTON */}
        {!showAddForm && (
            <button 
                className="btn btn-white w-100 p-3 rounded-4 shadow-sm border border-dashed text-primary fw-bold mb-4 d-flex align-items-center justify-content-center gap-2"
                onClick={() => setShowAddForm(true)}
            >
                <i className="fa-solid fa-plus"></i> Add New Address
            </button>
        )}

        {/* ADD FORM CARD */}
        {showAddForm && (
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 animate-fade-in">
                <h6 className="fw-bold mb-3">New Location</h6>
                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <label className="small text-muted">Label (Optional)</label>
                        <input 
                            type="text" className="form-control" placeholder="e.g. Home, Office"
                            value={newAddress.label}
                            onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="small text-muted">Full Address</label>
                        <textarea 
                            className="form-control" rows="3" placeholder="House No, Street, Area..."
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                            required
                        ></textarea>
                    </div>
                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-light flex-fill rounded-pill" onClick={() => setShowAddForm(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary flex-fill rounded-pill fw-bold">Save Address</button>
                    </div>
                </form>
            </div>
        )}

        {/* ADDRESS LIST */}
        {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
        ) : (
            <div className="d-flex flex-column gap-3">
                {addresses.length === 0 && !showAddForm ? (
                    <div className="text-center py-5 opacity-50">
                        <i className="fa-solid fa-map-location-dot display-1 text-muted"></i>
                        <p className="mt-3">No addresses saved yet.</p>
                    </div>
                ) : (
                    addresses.map((addr) => (
                        <div key={addr.id} className="card border-0 shadow-sm rounded-4 p-3">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="d-flex gap-3">
                                    <div className="bg-light rounded-circle p-3 text-secondary" style={{height:'fit-content'}}>
                                        <i className="fa-solid fa-location-dot fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 className="fw-bold text-dark mb-1">{addr.label || 'Other'}</h6>
                                        <p className="text-muted small mb-0 lh-sm">{addr.address}</p>
                                    </div>
                                </div>
                                <button 
                                    className="btn btn-light text-danger btn-sm rounded-circle"
                                    onClick={() => handleDelete(addr.id)}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default SavedAddresses;