
import './ComingSoonPage.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComingSoonPage() {
  const navigate = useNavigate();

  const handleBrowseClick = () => {
    navigate('/organizations'); // Navigate to the organization route
  };


  return (
    <div className="coming-soon-container">
      <header className="intro">
        <h1 className='project-title'>Qless</h1>
        <p>Coming Soon...</p>
      </header>


      <button 
        className="browse-button" 
        onClick={handleBrowseClick}
      >
        Browse Organizations
      </button>
    </div>

 );
};