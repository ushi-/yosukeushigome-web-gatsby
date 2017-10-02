import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'

import Header from '../components/Header'
import MainColumn from '../components/MainColumn'

class AboutTemplate extends React.Component { // eslint-disable-line
  render() {
    const post = this.props.data.markdownRemark // eslint-disable-line
    const { title, slug } = post.frontmatter
    const {
      headerTitle,
      headerSubtitle,
    } = this.props.data.site.siteMetadata // eslint-disable-line
    const siteTitle = `${title} | ${this.props.data.site.siteMetadata.title}` // eslint-disable-line
    return (
      <div>
        <Helmet>
          <title>{siteTitle}</title>
          <meta property="og:title" content={siteTitle} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`https://www.yosukeushigo.me${slug}`}
          />
        </Helmet>
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          link={(
            <Link to={'/'}>Less about me</Link>
          )}
        />
        <section className="section">
          <MainColumn>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: post.html }} // eslint-disable-line
            />
          </MainColumn>
        </section>
      </div>
    )
  }
}

export default AboutTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        headerTitle
        headerSubtitle
      }
    }
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`
