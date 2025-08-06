// src/components/Header/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import "./OrganizationHeader.css";

OrganizationHeader.propTypes = {
  orgName: PropTypes.string.isRequired
}

export function OrganizationHeader({ orgName }) {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <div className="logo" onClick={() => navigate("/")}>
        QLess
      </div>
      <div className="profile-section">
        <span className="org-name">{orgName}</span>
        <div className="avatar">{orgName?.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  );
};

