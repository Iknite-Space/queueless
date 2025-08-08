import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
        <li><a href="home.com">About Us</a></li>
        <li><a href="home.com">Contact Us</a></li>
        <li><a href="home.com">FAQ</a></li>
        </ul>

      </div>

      <div className="footer-section">
      <h3>Social</h3>
        <ul>
          <li>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
            </a>
          </li>
        </ul>
      </div> 

       <div className="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="home.com">Terms of Service</a></li>
          <li><a href="home.com">Pricing</a></li>
          <li><a href="home.com">Privacy Policy</a></li>
          <li><a href="home.com">Cookie Policy</a></li>
        </ul>
      </div>
</div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Qless. All rights reserved.</p>
      </div>
    </footer>
  );
}

