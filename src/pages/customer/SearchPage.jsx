// src/pages/user/SearchPage.jsx
import React, { useState } from 'react';
import UserNavbar from '../../components/UserNavbar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // DUMMY DATA (Replace with API Fetch later)
  const services = [
    { id: 1, name: "Ravi Plumber", category: "Plumber", price: "200/hr", rating: 4.8 },
    { id: 2, name: "Vijay Electrician", category: "Electrician", price: "300/hr", rating: 4.5 },
    { id: 3, name: "CleanHome Crew", category: "Cleaning", price: "999/Full", rating: 4.9 },
  ];

  return (
    <>
      <UserNavbar />
      <div className="container py-5">
        
        {/* Search Header */}
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <input 
              type="text" 
              className="form-control form-control-lg border-2" 
              placeholder="Search for Plumber, Electrician..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="row g-4">
          {services
            .filter(s => s.category.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((service) => (
            <div className="col-md-4" key={service.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title fw-bold">{service.name}</h5>
                    <span className="badge bg-success">{service.rating} ★</span>
                  </div>
                  <p className="text-muted mb-1">{service.category}</p>
                  <h6 className="text-primary fw-bold">₹ {service.price}</h6>
                  <button className="btn btn-outline-primary w-100 mt-3">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default SearchPage;