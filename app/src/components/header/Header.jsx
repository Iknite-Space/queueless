import React from 'react'
import './Header.css'
// import SearchInput from '../searchInput/SearchInput';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {

  return (
    <div className="header">
      <div className="logo">
        <h1>qless.</h1>
      </div>
      <div className="nav-bar">
        <ul>
          <nav>
            <Link to="/">Home</Link>
          </nav>
          <nav>
            <a href="#about">About</a>
          </nav>
          <nav>
            <a href="#services">Service</a>
          </nav>
          <nav>
            {/* preferable to use link so as not to re-load the pages but does the single page rendering */}
            <Link to="/contact" className="register-nav">
              Register
            </Link>
            {/* <a href="/contact">Services</a> */}
          </nav>
        <GiHamburgerMenu className='hamburger-icon'/>
        </ul>
      </div>
      <div className="search-bar-container">{/* <SearchInput /> */}</div>
    </div>
  );
};

export default Header