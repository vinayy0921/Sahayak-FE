import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';


const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Vinay' };
  const [topProviders, setTopProviders] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost/Sahayak-BE/get_providers.php")
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setTopProviders(data.providers);
        }
      })
      .catch(err => console.error("Error fetching providers:", err));
  }, []);

  return (
    <>
      <style>
        {`
          /* Custom Hover Effects */
          .hover-card {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
          }
          
          /* Icon Box Gradient */
          .icon-box-gradient {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          }
          
          /* Smooth horizontal scroll hiding */
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="bg-light min-vh-100 pb-5">


        <div className="container py-4">

          {/* --- SECTION 1: Welcome Banner & Stats --- */}
          <div className="row mb-4">
            {/* Welcome Card */}
            <div className="col-lg-8 mb-3 mb-lg-0 animate-card">
              <div className="card border-0 shadow-sm rounded-4 text-white overflow-hidden position-relative h-100 hover-card"
                style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0099ff 100%)' }}>

                {/* Decoration Circles */}
                <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '250px', height: '250px', top: '-80px', right: '-80px' }}></div>
                <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '150px', height: '150px', bottom: '-40px', left: '5%' }}></div>

                <div className="card-body p-4 p-lg-5 position-relative z-1 d-flex align-items-center justify-content-between">
                  <div>
                    <h2 className="fw-bold mb-2">Hello, {user.name}!</h2>
                    <p className="mb-4 opacity-90 fs-5">Home looking a bit messy? Let's fix it.</p>
                    <Link to="/user/search" className="btn btn-light text-primary fw-bold px-4 rounded-pill shadow-sm">
                      Book a Service
                    </Link>
                  </div>
                  <div className="d-none d-md-block opacity-25">
                    <i className="fa-solid fa-house-chimney display-1"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Wallet / Stats Card */}
            <div className="col-lg-4 animate-card">
              <div className="card border-0 shadow-sm rounded-4 h-100 hover-card bg-white">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="text-muted text-uppercase small fw-bold mb-0">Wallet Balance</h6>
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3">+ Add Money</span>
                  </div>
                  <h1 className="fw-bold text-dark mb-4">₹ 450.00</h1>

                  <div className="d-flex gap-2">
                    <div className="flex-grow-1 p-3 bg-light rounded-3 text-center">
                      <small className="d-block text-muted mb-1">Active</small>
                      <h5 className="fw-bold m-0 text-primary">2</h5>
                    </div>
                    <div className="flex-grow-1 p-3 bg-light rounded-3 text-center">
                      <small className="d-block text-muted mb-1">Completed</small>
                      <h5 className="fw-bold m-0 text-dark">14</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: Categories (Quick Access) --- */}
          <div className="d-flex justify-content-between align-items-center mb-3 animate-card">
            <h5 className="fw-bold text-dark m-0">Categories</h5>
            <Link to="/search" className="text-decoration-none small fw-bold">See All</Link>
          </div>

          <div className="row g-3 mb-5 animate-card">
            <CategoryCard icon="fa-wrench" color="primary" title="Plumber" link="/search?cat=plumber" />
            <CategoryCard icon="fa-bolt" color="warning" title="Electrician" link="/search?cat=electrician" />
            <CategoryCard icon="fa-broom" color="info" title="Cleaning" link="/search?cat=cleaning" />
            <CategoryCard icon="fa-snowflake" color="primary" title="AC Repair" link="/search?cat=ac" />
            <CategoryCard icon="fa-paint-roller" color="danger" title="Painting" link="/search?cat=painting" />
            <CategoryCard icon="fa-ellipsis" color="secondary" title="More" link="/search" />
          </div>

          {/* --- SECTION 3: Featured Providers & Active Booking --- */}
          <div className="row">

            {/* LEFT: Active Booking & History */}
            <div className="col-lg-7 mb-4">
              {/* Active Booking */}
              <h5 className="fw-bold mb-3 animate-card">Ongoing Service</h5>
              <div className="card border-0 shadow-sm rounded-4 mb-4 hover-card animate-card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-4 text-center p-3 me-3" style={{ minWidth: '80px' }}>
                      <h4 className="fw-bold mb-0">12</h4>
                      <small className="text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>Dec</small>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">Kitchen Deep Cleaning</h6>
                      <p className="text-muted small mb-1">
                        <i className="fa-regular fa-clock me-1"></i> 10:00 AM • <span className="text-primary">Sunita Cleaning</span>
                      </p>
                      <span className="badge bg-warning text-dark bg-opacity-25 px-2 py-1">Provider On The Way</span>
                    </div>
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3">Track</button>
                  </div>
                </div>
              </div>

              {/* Recent History (New Section) */}
              <h5 className="fw-bold mb-3 animate-card">Recent Activity</h5>
              <div className="card border-0 shadow-sm rounded-4 hover-card animate-card">
                <div className="list-group list-group-flush rounded-4">
                  <HistoryItem title="Fan Repair" date="Nov 28" price="150" status="Done" />
                  <HistoryItem title="Tap Leakage Fix" date="Nov 20" price="200" status="Done" />
                  <HistoryItem title="Sofa Cleaning" date="Nov 15" price="500" status="Done" />
                </div>
              </div>
            </div>

            {/* RIGHT: Top Rated Providers & Promo */}
            <div className="col-lg-5">

              {/* Special Offer */}
              <div className="card border-0 shadow-sm rounded-4 bg-dark text-white overflow-hidden mb-4 hover-card animate-card">
                <div className="card-body p-4 d-flex align-items-center justify-content-between position-relative">
                  <div className="position-relative z-1">
                    <span className="badge bg-warning text-dark mb-2">LIMITED TIME</span>
                    <h5 className="fw-bold">Get 20% OFF</h5>
                    <p className="small opacity-75 mb-3">On your first AC Service.</p>
                    <button className="btn btn-sm btn-light rounded-pill fw-bold">Claim Now</button>
                  </div>
                  <i className="fa-solid fa-gift display-1 text-white opacity-10 position-absolute end-0 bottom-0 me-3 mb-n3"></i>
                </div>
              </div>

              {/* Top Rated Pros (New Section) */}
              <h5 className="fw-bold mb-3 animate-card">Top Rated in Surat</h5>

              <div className="d-flex flex-column gap-3 animate-card">
                {topProviders.length === 0 ? (
                  <p className="text-muted">Loading...</p>
                ) : (
                  topProviders.map((pro) => (
                    <ProviderMiniCard
                      key={pro.id}
                      name={pro.name}
                      role={pro.profession}
                      rating="4.8"
                      img={`http://localhost/Sahayak-BE/DB/uploads/profile_pic/${pro.profile_img}`}
                    />
                  ))
                )}
              </div>


            </div>
          </div>

        </div>


      </div>
    </>
  );
};

// --- SUB-COMPONENTS ---

const CategoryCard = ({ icon, color, title, link }) => (
  <div className="col-6 col-md-4 col-lg-2">
    <Link to={link} className="text-decoration-none">
      <div className="card h-100 border-0 shadow-sm rounded-4 text-center hover-card">
        <div className="card-body p-3">
          <div className={`icon-box-gradient text-${color} rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center`} style={{ width: '50px', height: '50px' }}>
            <i className={`fa-solid ${icon} fs-5`}></i>
          </div>
          <h6 className="card-title text-dark small fw-bold mb-0">{title}</h6>
        </div>
      </div>
    </Link>
  </div>
);

const HistoryItem = ({ title, date, price, status }) => (
  <div className="list-group-item p-3 border-0 border-bottom d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center gap-3">
      <div className="bg-light rounded-circle p-2 text-muted">
        <i className="fa-solid fa-check"></i>
      </div>
      <div>
        <h6 className="mb-0 fw-bold">{title}</h6>
        <small className="text-muted">{date}</small>
      </div>
    </div>
    <div className="text-end">
      <h6 className="mb-0 fw-bold">₹{price}</h6>
      <small className="text-success fw-bold" style={{ fontSize: '0.7rem' }}>{status}</small>
    </div>
  </div>
);

const ProviderMiniCard = ({ name, role, rating, img }) => (
  <div className="card border-0 shadow-sm rounded-4 hover-card">
    <div className="card-body p-2 d-flex align-items-center">
      <img src={img} alt={name} className="rounded-circle me-3" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
      <div className="flex-grow-1">
        <h6 className="mb-0 fw-bold">{name}</h6>
        <small className="text-muted">{role}</small>
      </div>
      <div className="text-warning fw-bold small">
        <i className="fa-solid fa-star me-1"></i>{rating}
      </div>
    </div>
  </div>
);


export default Home;