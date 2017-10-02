import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/Footer'
import Seo from '../components/Seo'

import '../styles/main.sass'
import '../font-awesome/scss/font-awesome.scss'

const Layout = ({ children, location, data }) => {
  return (
    <div>
      <Seo />
      {children()}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  location: PropTypes.any, // eslint-disable-line
}

export default Layout

export const siteMetadataQuery = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
        headerTitle
        headerSubtitle
      }
    }
  }
`
