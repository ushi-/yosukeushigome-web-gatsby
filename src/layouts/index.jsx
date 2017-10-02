import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer'
import ogpImage from '../utils/ogpImage.jpg'

import '../styles/main.sass'
import '../font-awesome/scss/font-awesome.scss'

const Layout = ({ children, location, data }) => {
  const { title, headerTitle, headerSubtitle } = data.site.siteMetadata
  const description = `${headerTitle} ${headerSubtitle}`
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yosukeushigo.me" />
        <meta property="og:image" content={ogpImage} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ushi_" />
      </Helmet>
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
