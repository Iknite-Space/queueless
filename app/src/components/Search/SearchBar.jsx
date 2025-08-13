import React from "react";
import PropTypes from "prop-types";
import { CiSearch } from "react-icons/ci"; // search icon
import "./SearchBar.css";

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="search-container">
      <CiSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="org-search-bar"
      />
    </div>
  );
}

export default SearchBar;
