import React from "react"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import PropTypes from "prop-types"
import { Outlet } from "react-router";



const HeaderLayout = () => (
  <>
  <Header/>
  <main><Outlet /></main>
  <Footer />
  </>
)

HeaderLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default HeaderLayout;
