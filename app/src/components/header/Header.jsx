import React from 'react'
import './Header.css'
import SearchInput from '../searchInput/SearchInput';
import { Link } from "react-router-dom";

function Header() {

  return (
    <div className="header">
      <div className="logo">
        <h1>qless.</h1>
      </div>
      <div className="nav-bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            {/* preferable to use link so as not to re-load the pages but does the single page rendering */}
            <Link to="/contact">Register Services</Link>
            {/* <a href="/contact">Services</a> */}
          </li>
        </ul>
      </div>
      <div className="search-bar-container">
        <SearchInput />
      </div>
    </div>
  );
};

export default Header