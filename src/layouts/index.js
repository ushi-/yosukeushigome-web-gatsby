import React from "react"
import PropTypes from "prop-types"
import { Grid, Row, Col } from 'react-flexbox-grid';

import Header from '../components/header'

import "../styles/main.sass"
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
