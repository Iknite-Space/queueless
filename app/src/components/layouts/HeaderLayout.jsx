import React from "react"
import Header from "../header/Header";
import PropTypes from "prop-types"
import { Outlet } from "react-router";



const HeaderLayout = () => (
  <>
  <Header/>
  <main><Outlet /></main>
  </>
)

HeaderLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default HeaderLayout;
