import React from "react"
import PropTypes from "prop-types"
import { Grid, Row, Col } from 'react-flexbox-grid';

import Footer from '../components/footer'

import "../styles/main.sass"
import "../font-awesome/scss/font-awesome.scss"

const Layout = ({ children, location }) => {
  return (
    <div>
      {children()}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any,
}

export default Layout
