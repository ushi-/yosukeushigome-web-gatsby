import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Footer from '../components/Footer'
import ogpImage from '../utils/ogpImage.jpg'

import '../styles/main.sass'
import '../font-awesome/scss/font-awesome.scss'

import favicon0 from '../assets/favicon/favicon0.ico'
import favicon1 from '../assets/favicon/favicon1.ico'
import favicon2 from '../assets/favicon/favicon2.ico'
import favicon3 from '../assets/favicon/favicon3.ico'
import favicon4 from '../assets/favicon/favicon4.ico'
import favicon5 from '../assets/favicon/favicon5.ico'
import favicon6 from '../assets/favicon/favicon6.ico'
import favicon7 from '../assets/favicon/favicon7.ico'
import favicon8 from '../assets/favicon/favicon8.ico'
import favicon9 from '../assets/favicon/favicon9.ico'
import favicon10 from '../assets/favicon/favicon10.ico'
import favicon11 from '../assets/favicon/favicon11.ico'

const FAVICONS = [favicon0, favicon1, favicon2, favicon3, favicon4, favicon5, favicon6, favicon7, favicon8, favicon9, favicon10, favicon11]

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      faviconIndex: 0,
    }
  }

  componentDidMount() {
    setInterval(() => {
      let faviconIndex = this.state.faviconIndex + 1
      if (faviconIndex >= FAVICONS.length) {
        faviconIndex = 0
      }
      this.setState({ faviconIndex })
    }, 1000)
  }

  render() {
    const { children, location, data } = this.props
    const { title, headerTitle, headerSubtitle } = data.site.siteMetadata
    const description = `${headerTitle} ${headerSubtitle}`
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

          <link rel="shortcut icon" href={FAVICONS[this.state.faviconIndex]} />
        </Helmet>
        {children()}
        <Footer />
      </div>
    )
  }
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
