import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import{Link as ScrollLink} from 'react-scroll'
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
              <ScrollLink to="about" smooth={true}
                onClick={() => setIsMenuOpen(false)}>
                About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="services"
                smooth={true}
                onClick={() => setIsMenuOpen(false)}
              >
                Service
              </ScrollLink>
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
