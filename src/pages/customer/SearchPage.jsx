import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import anime from 'animejs/lib/anime.es.js'; // Anime.js V3
import BottomNav from '../../components/BottomNav'; // Your bottom nav

const SearchPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // Mock Data
  const suggestions = [
    "Plumber in Adajan", "AC Repair", "Sofa Cleaning", "Electrician"
  ];

  const popularTags = ["Cleaning", "Painting", "Pest Control", "Carpenter", "Salon"];

  // useEffect(() => {
  //   // 1. Auto-focus input
  //   if(inputRef.current) inputRef.current.focus();

  //   // 2. Load recent searches
  //   const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
  //   setRecentSearches(stored);

  //   // 3. Animation: Slide items up
  // //   anime({
  // //     targets: '.animate-item',
  // //     translateY: [20, 0],
  // //     opacity: [0, 1],
  // //     delay: anime.stagger(50),
  // //     easing: 'easeOutExpo'
  // //   });
  // // }, []);

  const handleSearch = (searchTerm) => {
    if(!searchTerm.trim()) return;
    
    // Save to Recent
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Navigate to results (You will build ResultsPage later)
    // navigate(`/results?q=${searchTerm}`);
    alert(`Searching for: ${searchTerm}`);
  };

  const clearRecent = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  return (
    <>
      <style>
        {`
          .search-input-wrapper {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            padding: 8px 15px;
            border: 1px solid #eee;
            transition: all 0.2s ease;
          }
          .search-input-wrapper:focus-within {
            border-color: #0d6efd;
            box-shadow: 0 4px 15px rgba(13, 110, 253, 0.15);
          }
          .search-input {
            border: none;
            outline: none;
            width: 100%;
            font-size: 1rem;
            color: #333;
            margin-left: 10px;
          }
          .tag-pill {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            color: #555;
            white-space: nowrap;
            transition: all 0.2s;
            cursor: pointer;
          }
          .tag-pill:hover {
            background: #e9ecef;
            color: #000;
          }
        `}
      </style>

      <div className="bg-white min-vh-100 pb-5">
        
        {/* --- HEADER --- */}
        <div className="sticky-top bg-white px-3 py-3 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <button onClick={() => navigate(-1)} className="btn btn-light rounded-circle p-2" style={{width:'40px', height:'40px'}}>
              <i className="fa-solid fa-arrow-left text-muted"></i>
            </button>
            
            <div className="search-input-wrapper flex-grow-1">
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
              <input 
                ref={inputRef}
                type="text" 
                className="search-input" 
                placeholder="Search for services..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              />
              {query && (
                <i className="fa-solid fa-xmark text-muted cursor-pointer" onClick={() => setQuery('')}></i>
              )}
            </div>
          </div>
        </div>

        {/* --- BODY --- */}
        <div className="container py-4">
          
          {/* 1. Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-4 animate-item">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-muted small text-uppercase mb-0">Recent</h6>
                <button onClick={clearRecent} className="btn btn-link text-decoration-none p-0 small text-muted">Clear</button>
              </div>
              <div className="list-group list-group-flush">
                {recentSearches.map((item, index) => (
                  <button 
                    key={index} 
                    className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-center gap-3"
                    onClick={() => handleSearch(item)}
                  >
                    <i className="fa-regular fa-clock text-muted"></i>
                    <span>{item}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square ms-auto text-muted small opacity-50"></i>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Popular Tags */}
          <div className="mb-4 animate-item">
            <h6 className="fw-bold text-muted small text-uppercase mb-3">Popular</h6>
            <div className="d-flex flex-wrap gap-2">
              {popularTags.map((tag, idx) => (
                <span key={idx} className="tag-pill" onClick={() => handleSearch(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Suggestions (Static for now) */}
          <div className="animate-item">
            <h6 className="fw-bold text-muted small text-uppercase mb-2">Suggestions</h6>
            <div className="list-group list-group-flush">
              {suggestions.map((item, index) => (
                <button 
                  key={index} 
                  className="list-group-item list-group-item-action border-0 px-0 py-3 d-flex align-items-center gap-3"
                  onClick={() => handleSearch(item)}
                >
                  <div className="bg-light rounded-circle p-2 text-primary">
                    <i className="fa-solid fa-fire"></i>
                  </div>
                  <span className="fw-medium">{item}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* --- BOTTOM NAV (Visible so user can switch back) --- */}
        <BottomNav />
      </div>
    </>
  );
};

export default SearchPage;