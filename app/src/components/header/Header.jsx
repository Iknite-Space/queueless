// import React from 'react'
// import './Header.css'
// // import SearchInput from '../searchInput/SearchInput';
// import { Link } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";

// function Header() {

//   return (
//     <div className="header">
//       <div className="logo">
//         <h1>qless.</h1>
//       </div>
//       <div className="nav-bar">
//         <ul>
//           <nav>
//             <Link to="/">Home</Link>
//           </nav>
//           <nav>
//             <a href="#about">About</a>
//           </nav>
//           <nav>
//             <a href="#services">Service</a>
//           </nav>
//           <nav>
//             {/* preferable to use link so as not to re-load the pages but does the single page rendering */}
//             <Link to="/contact" className="register-nav">
//               Register
//             </Link>
//             {/* <a href="/contact">Services</a> */}
//           </nav>
//         <GiHamburgerMenu className='hamburger-icon'/>
//         </ul>
//       </div>
//       <div className="search-bar-container">{/* <SearchInput /> */}</div>
//     </div>
//   );
// };

// export default Header

import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h1>qless.</h1>
      </div>

      <nav className={`nav-bar ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Service</a>
          </li>
          <li>
            <Link to="/contact" className="register-nav">
              Register
            </Link>
          </li>
        </ul>
      </nav>

      <GiHamburgerMenu
        className="hamburger-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
    </header>
  );
}

export default Header;
