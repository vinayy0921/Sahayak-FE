import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Removed Anime.js import as per your request to keep it clean, using CSS animations
// import anime from 'animejs/lib/anime.es.js';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Vinay' };

  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    // 1. Cleaning (Royal Blue)
    {
      title: "Home looking messy?",
      subtitle: "Book a deep cleaning session today.",
      btn: "Book Now",
      color: "#4361EE",
      icon: "fa-broom",
      search:"cleaning"
    },

    // 2. AC Repair (Indigo)
    {
      title: "AC not cooling?",
      subtitle: "Get expert repair in 60 mins.",
      btn: "Fix Now",
      color: "#3F37C9",
      icon: "fa-snowflake",
      search:"ac repair"
    },

    // 3. Painting (Safety Orange)
    {
      title: "Renovating?",
      subtitle: "Painters & Decorators available.",
      btn: "Explore",
      color: "#FF9F1C",
      icon: "fa-paint-roller",
      search:"painting"
    },

    // 4. Plumbing (Emerald Green)
    {
      title: "Leaky tap?",
      subtitle: "Expert plumbers at your doorstep.",
      btn: "Find Plumber",
      color: "#10B981",
      icon: "fa-faucet",
      search:"plumber"
    },

    // 5. Electrical (Golden Yellow)
    {
      title: "Power issue?",
      subtitle: "Fix wiring & switches instantly.",
      btn: "Get Sparky",
      color: "#F59E0B",
      icon: "fa-bolt",
      search:"electrician"
    },

    // 6. Salon/Beauty (Hot Pink)
    {
      title: "Self-care time?",
      subtitle: "Salon services at home.",
      btn: "Pamper Me",
      color: "#F72585",
      icon: "fa-scissors",
      search:"salon"
    },

    // 7. Pest Control (Deep Purple)
    {
      title: "Pests taking over?",
      subtitle: "Safe & herbal pest control.",
      btn: "Sanitize",
      color: "#7209B7",
      icon: "fa-bug",
      search:"pest control"
    },

    // 8. Carpentry (Wood Brown/Orange)
    {
      title: "Broken furniture?",
      subtitle: "Skilled carpenters for any job.",
      btn: "Repair It",
      color: "#D35400",
      icon: "fa-hammer",
      search:"carpenter"
    },

    // 9. Appliance Repair (Vibrant Red)
    {
      title: "Fridge stopped?",
      subtitle: "Washing machine & Fridge repair.",
      btn: "Book Repair",
      color: "#EF476F",
      icon: "fa-screwdriver-wrench",
      search:"appliance repair"
    },

    // 10. Car Wash (Sky Blue)
    {
      title: "Dirty Car?",
      subtitle: "Professional car wash at your parking.",
      btn: "Wash Now",
      color: "#4CC9F0",
      icon: "fa-car",
      search:"car wash"
    }
  ];

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Animation on Load
  useEffect(() => {
    // anime({
    //   targets: '.animate-card',
    //   translateY: [20, 0],
    //   opacity: [0, 1],
    //   delay: anime.stagger(100),
    //   duration: 800,
    //   easing: 'easeOutExpo'
    // });
  }, []);

  return (
    <>
      <style>
        {`
          .hover-card { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
          .hover-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important; }
          .icon-box-gradient { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); }
          
          /* Carousel Dots */
          .carousel-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: all 0.3s; cursor: pointer; }
          .carousel-dot.active { width: 20px; border-radius: 10px; background: white; }
          
          /* Slide Animation */
          .slide-content { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        `}
      </style>

      <div className="bg-light min-vh-100 pb-5">

        <div className="container py-4">

          {/* --- SECTION 1: SLIDING HERO BANNER (NEW) --- */}
          {/* --- SECTION 1: SLIDING HERO BANNER --- */}
          <div className="row mb-4">
            <div className="col-lg-8 mb-3 mb-lg-0 animate-card">
              <div
                className="card border-0 shadow-sm rounded-4 text-white overflow-hidden position-relative h-100"
                style={{
                  background: `linear-gradient(135deg, ${slides[activeSlide].color} 0%, #000 150%)`,
                  transition: 'background 0.5s ease'
                }}
              >
                {/* Decoration (Reduced opacity slightly so icon stands out more) */}
                <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '250px', height: '250px', top: '-80px', right: '-80px' }}></div>

                <div className="card-body p-4 p-lg-5 position-relative z-1 d-flex align-items-center justify-content-between">

                  {/* Text Content */}
                  <div className="slide-content" key={activeSlide}>
                    <div className="badge bg-white bg-opacity-20 mb-2 px-3 py-2 border border-white border-opacity-25">Featured Offer</div>
                    <h2 className="fw-bold mb-2 display-6 text-shadow-sm">{slides[activeSlide].title}</h2>
                    <p className="mb-4 opacity-90 fs-5 text-shadow-sm">{slides[activeSlide].subtitle}</p>
                    <Link to={`/user/search?q=${slides[activeSlide].search}`} className="btn btn-light text-primary fw-bold px-4 py-2 rounded-pill shadow-lg">
                      {slides[activeSlide].btn}
                    </Link>
                  </div>

                  {/* --- FIXED ICON SECTION --- */}
                  <div className="d-none d-md-block slide-content text-end">
                    {/* Removed 'opacity-25', added inline style for control */}
                    <i
                      className={`fa-solid ${slides[activeSlide].icon}`}
                      style={{
                        fontSize: '8rem',
                        opacity: 0.9,
                        textShadow: '0 10px 20px rgba(0,0,0,0.3)', // Drop shadow makes it visible
                        transform: 'rotate(-10deg)' // Slight tilt for style
                      }}
                    ></i>
                  </div>

                </div>

                {/* Dots */}
                <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                  {slides.map((_, idx) => (
                    <div key={idx} className={`carousel-dot ${idx === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(idx)}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wallet Card (Unchanged) */}
            <div className="col-lg-4 animate-card">
              {/* ... keep your existing wallet card code ... */}
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

          {/* --- SECTION 2: Categories --- */}
          <div className="d-flex justify-content-between align-items-center mb-3 animate-card">
            <h5 className="fw-bold text-dark m-0">Categories</h5>
            <Link to="/user/search" className="text-decoration-none small fw-bold">See All</Link>
          </div>

          <div className="row g-3 mb-5 animate-card">
            <CategoryCard icon="fa-wrench" color="primary" title="Plumber" link="/user/search?q=plumber" />
            <CategoryCard icon="fa-bolt" color="warning" title="Electrician" link="/user/search?q=electrician" />
            <CategoryCard icon="fa-broom" color="info" title="Cleaning" link="/user/search?q=cleaning" />
            <CategoryCard icon="fa-snowflake" color="primary" title="AC Repair" link="/user/search?q=ac" />
            <CategoryCard icon="fa-paint-roller" color="danger" title="Painting" link="/user/search?q=painting" />
            <CategoryCard icon="fa-ellipsis" color="secondary" title="More" link="/user/search" />
          </div>

          {/* --- SECTION 3: Content Split --- */}
          <div className="row">
            {/* LEFT: Activity */}
            <div className="col-lg-7 mb-4">
              <h5 className="fw-bold mb-3 animate-card">Recent Activity</h5>
              <div className="card border-0 shadow-sm rounded-4 hover-card animate-card">
                <div className="list-group list-group-flush rounded-4">
                  <HistoryItem title="Fan Repair" date="Nov 28" price="150" status="Done" />
                  <HistoryItem title="Tap Leakage Fix" date="Nov 20" price="200" status="Done" />
                  <HistoryItem title="Sofa Cleaning" date="Nov 15" price="500" status="Done" />
                </div>
              </div>
            </div>

            {/* RIGHT: Top Rated */}
            <div className="col-lg-5">
              <h5 className="fw-bold mb-3 animate-card">Top Rated Pros</h5>
              <div className="d-flex flex-column gap-3 animate-card">
                <ProviderMiniCard name="Rajesh Mistry" role="Plumber" rating="4.9" img="https://randomuser.me/api/portraits/men/32.jpg" />
                <ProviderMiniCard name="Priya Services" role="Electrician" rating="4.8" img="https://randomuser.me/api/portraits/women/44.jpg" />
                <ProviderMiniCard name="CleanX Crew" role="Cleaning" rating="5.0" img="https://randomuser.me/api/portraits/men/85.jpg" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

// --- Sub-Components (Keep them same) ---
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
      <div className="bg-light rounded-circle p-2 text-muted"><i className="fa-solid fa-check"></i></div>
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