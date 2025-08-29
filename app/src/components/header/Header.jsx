import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <Link to="/">
          <img
            src="/assets/images/logo.png"
            alt="queueless logo"
            className="qless-logo"
          />
        </Link>

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
            <li>
              <Link to="/login" className="register-nav">
                Login
              </Link>
            </li>
          </ul>
        </nav>

        <GiHamburgerMenu
          className="hamburger-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </header>

      {isMenuOpen && (
        <div className="overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}

export default Header;
