import React from "react";
import Footer from "../footer/Footer";
import PropTypes from "prop-types"
import { Outlet } from "react-router";


const PlainLayout = () => (
  <>
    <main><Outlet /></main>
    <Footer />
  </>
);

PlainLayout.propTypes ={
  children: PropTypes.node.isRequired
}

export default PlainLayout;