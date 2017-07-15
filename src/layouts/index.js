import React from "react"
import PropTypes from "prop-types"

import Header from '../components/header'

import "../styles/bulma.sass"
import "../font-awesome/scss/font-awesome.scss"

const Layout = ({ children }) =>
  <div>
    <Header />
    {children()}
  </div>

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
