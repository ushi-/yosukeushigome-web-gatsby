import React from 'react'
import Link from 'gatsby-link'

import Header from '../components/Header'
import MainColumn from '../components/MainColumn'
import Seo from '../components/Seo'

class AboutTemplate extends React.Component { // eslint-disable-line
  render() {
    const post = this.props.data.markdownRemark // eslint-disable-line
    const {
      headerTitle,
      headerSubtitle,
    } = this.props.data.site.siteMetadata // eslint-disable-line
    return (
      <div>
        <Seo post={post} />
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
        title
      }
      fields {
        slug
        isProject
      }
    }
  }
`
