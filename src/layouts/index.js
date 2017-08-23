import React from "react"
import PropTypes from "prop-types"
import {Helmet} from "react-helmet";

import Footer from '../components/footer'
import "../styles/main.sass"
import "../font-awesome/scss/font-awesome.scss"
import ogpImage from '../pages/projects/omotenashi_mask/images/index.jpg'

const Layout = ({ children, location, data }) => {
  const { title, headerTitle, headerSubtitle } = data.site.siteMetadata
  const description = headerTitle + ' ' + headerSubtitle
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta property="og:image" content={ogpImage} />
        <meta name="twitter:image" content={ogpImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ushi_" />
        <meta name="twitter:creator" content="@ushi_" />
      </Helmet>
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
