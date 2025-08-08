import './SearchBar.css';
import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      {/* Search bar with icon */}
      <div className="search-bar-wrapper">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search organization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="org-search-bar"
        />
      </div>
    </div>
  );
}

export default SearchBar;
