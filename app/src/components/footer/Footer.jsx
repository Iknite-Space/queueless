import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/create-service">Contact Us</Link>
            </li>
            <li>
              <Link to="https://iknite-space.github.io/posts/newsletters/03-the-journey/">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Social</h3>
          <ul>
            <li>
              <Link
                to="https://www.facebook.com/iknite.space/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/iknitespace?igsh=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/company/iknite-space"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="#">Terms of Service</Link>
            </li>
            <li>
              <Link to="#">Pricing</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Qless. All rights reserved.</p>
      </div>
    </footer>
  );
}

