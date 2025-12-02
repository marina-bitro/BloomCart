import React, { useState, useRef } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const aboutRef = useRef(null); // ΠΡΟΣΘΗΚΗ

  const handleGetStartedClick = () => {
    setShowProductList(true);
    // Scroll στο AboutUs μόλις εμφανιστεί η ProductList
    setTimeout(() => {
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Bloom Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>

            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>

          {/* ΠΡΟΣΘΗΚΗ REF */}
          <div className="aboutus_container">
            <AboutUs ref={aboutRef}/>
          </div>
        </div>
      </div>

      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList 
          onHomeClick={handleHomeClick} 
          onAboutClick={() => {
            if (aboutRef.current) {
              aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
