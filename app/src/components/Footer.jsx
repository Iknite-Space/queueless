import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <p>© {new Date().getFullYear()} 
        Qless. All rights reserved.</p>  // grabs the current year from the system clock.
    </footer>
  );
}
