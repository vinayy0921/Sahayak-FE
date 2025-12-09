import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiConfig';

const MyServices = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    // 2. Fetch Categories in useEffect
    useEffect(() => {
        if (!user) { navigate('/login'); return; }

        fetchServices(); // Your existing function

        // Fetch Categories
        fetch(`${API_BASE_URL}provider/get_categories.php`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Cat Error:", err));
    }, []);

    // Add Form State
    const [isAdding, setIsAdding] = useState(false);
    const [newService, setNewService] = useState({
        service_name: '',
        price_per_hour: '',
        description: '',
        category_id: ''
    });

    // --- 1. FETCH SERVICES ---
    const fetchServices = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}provider/get_my_service.php?id=${user.id}`);
            const data = await res.json();
            setServices(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) navigate('/login');
        else fetchServices();
    }, []);



    // --- 2. ADD SERVICE ---
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newService.service_name || !newService.price_per_hour || !newService.category_id) {
            alert("Please fill all fields including Category");
            return;
        }

        try {
            // console.log("Sending Data:", newService); // Debug 1

            const response = await fetch(`${API_BASE_URL}provider/add_service.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, // Ensure this header exists!
                body: JSON.stringify({
                    provider_id: user.id,
                    category_id: newService.category_id,
                    service_name: newService.service_name,
                    price: newService.price_per_hour,
                    desc: newService.description
                })
            });

            // Debug 2: Check if PHP returned HTML error instead of JSON
            const text = await response.text();
            // console.log("Raw Response:", text);

            const data = JSON.parse(text); // Manually parse to catch errors

            if (data.status === 'success') {
                setNewService({ service_name: '', price_per_hour: '', description: '' });
                setIsAdding(false);
                alert("Service Added Successfully!");
                fetchServices(); // Refresh the list immediately
            } else {
                alert("Server Error: " + data.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Failed to add service. Check console.");
        }
    };

    // --- 3. DELETE SERVICE ---
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this service? Customers won't be able to book it anymore.")) return;

        try {
            await fetch(`${API_BASE_URL}provider/delete_service.php`, {
                method: 'POST',
                body: JSON.stringify({ service_id: id })
            });
            fetchServices();
        } catch (error) {
            alert("Delete failed");
        }
    };

    return (
        <>
            <style>
                {`
            .service-card {
                background: #fff;
                border: 1px solid #f1f5f9;
                border-radius: 16px;
                transition: transform 0.2s;
                position: relative;
                overflow: hidden;
            }
            .service-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
            
            .add-card {
                border: 2px dashed #cbd5e1;
                background: #f8fafc;
                color: #64748b;
                cursor: pointer;
            }
            .add-card:hover {
                border-color: #2563EB;
                color: #2563EB;
                background: #eff6ff;
            }
            `}
            </style>

            <div className="bg-light min-vh-100 pb-5">

                {/* HEADER */}
                <div className="bg-white px-4 py-3 sticky-top shadow-sm z-3 d-flex align-items-center gap-3">
                    <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2">
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <div>
                        <h5 className="m-0 fw-bold text-dark">My Services</h5>
                        <p className="text-muted small m-0">Manage what you offer & prices</p>
                    </div>
                </div>

                <div className="container py-4">

                    {/* LIST OF SERVICES */}
                    <div className="row g-3">

                        {/* 1. ADD NEW BUTTON CARD */}
                        <div className="col-12 col-md-6">
                            <div
                                className="service-card add-card h-100 p-4 d-flex flex-column align-items-center justify-content-center text-center"
                                style={{ minHeight: '150px' }}
                                onClick={() => setIsAdding(true)}
                            >
                                <div className="bg-white p-3 rounded-circle shadow-sm mb-2">
                                    <i className="bi bi-plus-lg fs-4"></i>
                                </div>
                                <h6 className="fw-bold m-0">Add New Service</h6>
                            </div>
                        </div>

                        {/* 2. EXISTING SERVICES */}
                        {!loading && services.map((item) => (
                            <div className="col-12 col-md-6" key={item.id}>
                                <div className="service-card p-3 h-100 d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h6 className="fw-bold text-dark fs-5 m-0">{item.service_name}</h6>
                                        <button
                                            className="btn btn-light text-danger btn-sm rounded-circle"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>

                                    <p className="text-muted small flex-grow-1">
                                        {item.description || "No description provided."}
                                    </p>

                                    <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                        <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.7rem' }}>Rate per Hour</small>
                                        <span className="badge bg-success bg-opacity-10 text-success fs-6">₹{item.price_per_hour}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


            </div>

            {/* === ADD SERVICE MODAL === */}
            {isAdding && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0">
                            <div className="modal-header border-0">
                                <h5 className="modal-title fw-bold">Add Service</h5>
                                <button type="button" className="btn-close" onClick={() => setIsAdding(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAdd}>

                                    <div className="mb-3">
                                        <label className="small text-muted fw-bold">Category</label>
                                        <select
                                            className="form-select"
                                            value={newService.category_id}
                                            onChange={(e) => setNewService({ ...newService, category_id: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {/* DYNAMIC MAP */}
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="small text-muted fw-bold">Service Name</label>
                                        <input
                                            type="text" className="form-control" placeholder="e.g. Tap Repair"
                                            value={newService.service_name}
                                            onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="small text-muted fw-bold">Price (₹)</label>
                                        <input
                                            type="number" className="form-control" placeholder="e.g. 200"
                                            value={newService.price_per_hour}
                                            onChange={(e) => setNewService({ ...newService, price_per_hour: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="small text-muted fw-bold">Description</label>
                                        <textarea
                                            className="form-control" rows="3" placeholder="What is included?"
                                            value={newService.description}
                                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button className="btn btn-primary w-100 py-2 rounded-pill fw-bold">Save Service</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyServices;