import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { API_BASE_URL } from '../../config/apiConfig';
import '../../styles/SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSearching = !!searchParams.get('q');
  const popularTags = ["Cleaning", "Painting", "Carpenter", "Salon", "Plumber"];

  useEffect(() => {
    const currentQuery = searchParams.get('q');
    if (currentQuery) {
      setQuery(currentQuery);
      fetchResults(currentQuery);
    } else {
      setResults([]);
      setQuery('');
      const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
      setRecentSearches(stored);
    }
  }, [searchParams]);

  useEffect(() => {
    if (inputRef.current && !isSearching) inputRef.current.focus();
  }, []);

  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}user/search.php?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    setSearchParams({ q: searchTerm });
    const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
    const updated = [searchTerm, ...stored.filter(s => s !== searchTerm)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  const goToProvider = (id) => {
    navigate(`/user/provider/${id}`);
  };

  const handleBook = (service) => {
    // We pass the entire service object to the next page
    navigate('/user/book-service', { state: { service: service } });
};

  return (
    <>

      <div className="bg-light min-vh-100 pb-5">

        {/* HEADER */}
        <div className="sticky-top bg-white px-3 py-3 border-bottom shadow-sm z-3">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2 shadow-sm">
              <i className="fa-solid fa-arrow-left text-muted"></i>
            </button>

            <div className="search-input-wrapper flex-grow-1">
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search services (e.g. Plumber)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              />
              {query && (
                <i className="fa-solid fa-xmark text-muted cursor-pointer" onClick={clearSearch}></i>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="container py-4">

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="text-muted mt-2 small fw-medium">Searching best pros...</p>
            </div>
          )}

          {!loading && isSearching && (
            <div className="animate-fade-in">
              <h6 className="fw-bold mb-3 text-dark">Results for "{searchParams.get('q')}"</h6>

              {results.length === 0 ? (
                <div className="text-center py-5 opacity-50">
                  <i className="fa-regular fa-face-frown display-1 mb-3 text-secondary"></i>
                  <h5>No services found</h5>
                  <p>Try searching for general terms like "Cleaning"</p>
                </div>
              ) : (
                <div className="row g-3">
                  {results.map((service) => (
                    <div className="col-12 col-md-6 col-lg-4" key={service.id}>
                      {/* --- MODERN RESULT CARD --- */}
                      <div className="card border-0 shadow-sm rounded-4 p-3 modern-card h-100 cursor-pointer" onClick={() => goToProvider(service.provider_id)}
                      >
                        <div className="d-flex gap-3">

                          {/* Left: Image */}
                          <div className="service-img-container">
                            <img
                              src={service.profile_img || "https://via.placeholder.com/100"}
                              className="service-img"
                              alt="provider"
                            />
                          </div>

                          {/* Right: Content */}
                          <div className="flex-grow-1 d-flex flex-column justify-content-between">

                            {/* Top Section */}
                            <div>
                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <h6 className="fw-bold mb-0 text-dark text-truncate" style={{ maxWidth: '140px' }}>{service.service_name}</h6>
                                <span className="badge bg-warning text-dark d-flex align-items-center gap-1 px-2">
                                  4.8 <i className="fa-solid fa-star" style={{ fontSize: '0.6rem' }}></i>
                                </span>
                              </div>

                              <div className="d-flex align-items-center gap-2 mb-2">
                                <img src={service.profile_img || "https://via.placeholder.com/30"} className="provider-avatar-small" alt="" />
                                <small className="text-muted fw-medium" style={{ fontSize: '0.85rem' }}>{service.provider_name}</small>
                                {service.is_verified === 1 && <i className="fa-solid fa-circle-check text-primary small" title="Verified"></i>}
                              </div>

                              <div className="d-flex align-items-center gap-1 text-muted small mb-2">
                                <i className="fa-solid fa-location-dot text-danger opacity-75"></i>
                                <span className="text-truncate" style={{ maxWidth: '120px' }}>{service.city || "Surat"}</span>
                              </div>
                            </div>

                            {/* Bottom Action Section */}
                            <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-1">
                              <div>
                                <small className="text-muted d-block" style={{ fontSize: '0.7rem', lineHeight: '1' }}>STARTING AT</small>
                                <span className="fw-bold text-dark fs-5">₹{service.price_per_hour}</span>
                              </div>
                              <button className="book-btn shadow-sm"
                                onClick={(e) => { e.stopPropagation(); handleBook(service); }}>
                                Book
                              </button>
                            </div>

                          </div>
                        </div>
                      </div>
                      {/* -------------------------- */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!loading && !isSearching && (
            <div className="animate-fade-in">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-bold text-secondary small text-uppercase mb-0">Recent</h6>
                    <button onClick={() => { localStorage.removeItem('recentSearches'); setRecentSearches([]) }} className="btn btn-link text-decoration-none p-0 small text-muted">Clear</button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {recentSearches.map((item, index) => (
                      <span key={index} className="badge bg-white text-secondary border px-3 py-2 fw-normal cursor-pointer" onClick={() => handleSearch(item)}>
                        <i className="fa-regular fa-clock me-2"></i>{item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h6 className="fw-bold text-secondary small text-uppercase mb-3">Popular</h6>
                <div className="d-flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <span key={idx} className="badge bg-light text-dark border px-3 py-2 fw-medium cursor-pointer hover-scale" onClick={() => handleSearch(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default SearchPage;