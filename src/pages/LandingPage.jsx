import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="font-sans bg-light">
      
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
            SAHAYAK
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item provider-link">
                <Link className="nav-link text-dark fw-medium" to="/provider/register">Become a Provider</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-dark px-4 rounded-1" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary px-4 rounded-1" to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-white py-5 hero-section">
        <div className="container py-lg-4">
          <div className="row d-flex align-items-center justify-content-center flex-column-reverse flex-lg-row">
            
            {/* Left Text */}
            <div className="col-lg-6 mt-5 mt-lg-0 ">
              <h1 className="display-4 fw-bold text-dark mb-3">
                Book trusted local <br />
                services in your area
              </h1>
              <p className="lead text-secondary mb-4">
                Plumber, Electrician, AC repair, Tutor – <br />
                <span className="text-dark fw-medium">sab ek hi jagah.</span>
              </p>

              {/* Search Bar */}
              <div className="bg-white p-1 border rounded-3 d-flex shadow-sm" style={{maxWidth: '500px'}}>
                <input 
                  type="text" 
                  className="form-control border-0 shadow-none px-3" 
                  placeholder="Plumber, Electrician, AC repair..." 
                />
                <button className="btn btn-primary px-4 rounded-2 fw-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <img 
                src="./images/hero-img.jpg" 
                alt="Local Services" 
                className="img-fluid" 
                style={{maxHeight: '450px'}} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES GRID */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4">Popular Services</h3>
          
          <div className="row g-4">
            {/* Service Cards */}
            <ServiceCard icon="bi-wrench" title="Plumber" desc="Tap leakage, fix drilling repair" />
            <ServiceCard icon="bi-lightning-charge" title="Electrician" desc="Electric wiring, switch board" />
            <ServiceCard icon="bi-snow" title="AC Repair" desc="Split AC repair, gas filling" />
            <ServiceCard icon="bi-bucket" title="House Cleaning" desc="Full home deep cleaning" />
            <ServiceCard icon="bi-mortarboard" title="Home Tutor" desc="Expert tutor for all subjects" />
            <ServiceCard icon="bi-router" title="Wifi/Network" desc="Router setup & networking" />
            <ServiceCard icon="bi-pc-display" title="Computer Repair" desc="Laptop & PC expert service" />
            <ServiceCard icon="bi-phone" title="Mobile Repair" desc="Screen replace, battery fix" />
          </div>
        </div>
      </section>

      {/* 4. SERVICES NEAR YOU (List View) */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Services near you</h3>
            <a href="/" className="text-primary text-decoration-none fw-medium">Sent more &gt;</a>
          </div>

          <div className="row g-4">
            <ProviderCard 
              name="Ravi Plumbing Service" 
              role="Plumber" 
              desc="Full pipe repair, in changing homes" 
              distance="3 km away" 
              rating="4.8"
            />
            <ProviderCard 
              name="Priya Solutions" 
              role="Electrician" 
              desc="24x7 Inverter & wiring fix" 
              distance="20 km away" 
              rating="4.5"
            />
             <ProviderCard 
              name="CoolAir Solutions" 
              role="AC Repair" 
              desc="A8 km away - Long range service" 
              distance="8 km away" 
              rating="4.9"
            />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-5">How it Works</h3>
          <div className="row text-center g-4">
            
            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-list-check text-primary display-4"></i>
                </div>
                <h5 className="fw-bold">Choose Service</h5>
                <p className="text-secondary small">Select an option type based on your need</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-calendar-check text-primary display-4"></i>
                </div>
                <h5 className="fw-bold">Pick Time & Address</h5>
                <p className="text-secondary small">Check free time slots & set location</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="mb-3">
                  <i className="bi bi-person-check text-primary display-4"></i>
                </div>
                <h5 className="fw-bold">Get it done</h5>
                <p className="text-secondary small">Pro arrives at your doorstep to help</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-primary text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h4 className="fw-bold mb-3">LocalServe</h4>
              <p className="opacity-75 small">
                Local services for your city.<br/>
                Simple, fast, reliable.
              </p>
            </div>
            <div className="col-md-8 d-flex gap-4 align-items-start justify-content-md-end flex-wrap">
              <a href="/" className="text-white text-decoration-none opacity-75 hover-opacity-100">About</a>
              <a href="/" className="text-white text-decoration-none opacity-75 hover-opacity-100">Contact</a>
              <a href="/" className="text-white text-decoration-none opacity-75 hover-opacity-100">Terms</a>
              <a href="/" className="text-white text-decoration-none opacity-75 hover-opacity-100">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- SUB COMPONENTS ---

const ServiceCard = ({ icon, title, desc }) => (
  <div className="col-6 col-md-3">
    <div className="card h-100 border border-light shadow-sm p-3 rounded-3 hover-shadow transition">
      <div className="d-flex align-items-start gap-3">
        <div className="text-primary fs-4 bg-primary bg-opacity-10 p-2 rounded-2">
            <i className={`bi ${icon}`}></i>
        </div>
        <div>
          <h6 className="fw-bold mb-1 fs-6">{title}</h6>
          <p className="text-secondary mb-0" style={{fontSize: '0.75rem', lineHeight: '1.2'}}>{desc}</p>
        </div>
      </div>
    </div>
  </div>
);

const ProviderCard = ({ name, role, desc, distance, rating }) => (
  <div className="col-lg-4">
    <div className="card h-100 border border-light shadow-sm p-3 rounded-4">
      <div className="d-flex gap-3">
        {/* Avatar Placeholder */}
        <div className="bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width:'50px', height:'50px'}}>
            <i className="bi bi-person-fill text-secondary fs-4"></i>
        </div>
        
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-0">{name}</h6>
          <div className="text-secondary small mb-1">{role}</div>
          <p className="text-muted small mb-2" style={{fontSize: '0.8rem'}}>{desc}</p>
          
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="small text-muted">
                <i className="bi bi-geo-alt-fill me-1"></i>{distance}
            </div>
            <div className="small text-warning fw-bold">
                <i className="bi bi-star-fill me-1"></i>{rating}
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-100 mt-3 py-1 rounded-2 fw-medium text-white">
        View & Book
      </button>
    </div>
  </div>
);

export default LandingPage;