import "./ComingSoonPage.css";

import React from "react";
import { useNavigate } from "react-router";

// import Footer from "../../components/footer/Footer";

import Header from "../../components/header/Header";



export function ComingSoonPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/organizations");
  };

  return (
    <>
      <Header />
      <header className="coming-soon-container">
        <h1 className="project-title">Qless</h1>
      </header>

      <button className="navigation-button" onClick={handleClick}>
        View Organisations
      </button>
      {/* <Footer /> */}
    </>
  );
}
