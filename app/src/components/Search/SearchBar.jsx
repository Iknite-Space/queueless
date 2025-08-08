import './SearchBar.css'
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar(){

  const [searchText, setSearchText] = useState('')

  function searchAction() {
    alert(searchText)
  }
return (
    <>
      <CiSearch className=".search-icon" onClick={searchAction}/>
    </>
  );
  }
  export default SearchBar