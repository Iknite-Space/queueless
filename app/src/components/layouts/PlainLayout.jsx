import React from "react";
import PropTypes from "prop-types"
import { Outlet } from "react-router";


const PlainLayout = () => (

    <main><Outlet /></main>
  
);

PlainLayout.propTypes ={
  children: PropTypes.node.isRequired
}

export default PlainLayout;