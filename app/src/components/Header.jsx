import React from 'react'
import './Header.css'
import SearchInput from './SearchInput';

function Header() {

  return(
    <div className='header'>
      <div className="logo">
        <h1>qless.</h1>
      </div>
      <div className="nav-bar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
        </ul>
      </div>
      <div className="search-bar-container">
        <SearchInput />
      </div>
    </div>
  );
};

export default Header