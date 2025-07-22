import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import './SearchInput.css'

function SearchInput() {

  const [searchText, setSearchText] = useState('')

  function searchAction() {
    alert(searchText)
  }

  function saveInputText(event) {
      setSearchText(event.target.value)
    }
    
  return (
    <>
      <input
        className="search-bar"
        type="text"
        name="search-bar"
        id="search-bar"
        placeholder="Search"
        onChange={saveInputText}
      />
      <CiSearch className="search-button" onClick={searchAction} />
    </>
  );
}

export default SearchInput