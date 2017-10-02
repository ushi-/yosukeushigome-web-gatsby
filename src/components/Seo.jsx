import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import isRelativeUrl from 'is-relative-url'

import { siteMetadata } from '../siteConfig'
import Logo from '../assets/siteProfile.jpg'

const Seo = ({ post }) => {
  let title = siteMetadata.title
  let description = siteMetadata.description
  let type = 'website'
  let url = siteMetadata.url + siteMetadata.pathPrefix
  let image = Logo
  const siteName = siteMetadata.title
  const auther = siteMetadata.auther
  if (post) {
    const { isProject, slug } = post.fields
    title = `${post.frontmatter.title} | ${title}`
    type = 'article'
    url += slug
    if (isProject) {
      const { headerTitle, headerSubtitle } = post.frontmatter
      description = `${headerTitle} ${headerSubtitle}`
      image = post.fields.heroImageSrc
    }
  }
  if (isRelativeUrl(image)) {
    image = siteMetadata.url + siteMetadata.pathPrefix + image
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={auther} />
    </Helmet>
  )
}

Seo.propTypes = {
  post: PropTypes.object, // eslint-disable-line
}

Seo.defaultProps = {
  post: undefined,
}

export default Seo
