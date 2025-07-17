import "./ComingSoonPage.css";
import React from "react";
import { useNavigate } from "react-router";

export function ComingSoonPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/organizations");
  };

  return (
    <>
      <header className="intro">
        <h1 className="project-title">Qless</h1>
        <p>Coming Soon...</p>
      </header>

      <button className="navigation-button" onClick={handleClick}>
        View Organisations
      </button>
    </>
  );
}
