import React from 'react'
import Link from 'gatsby-link'

import Header from '../components/Header'
import MainColumn from '../components/MainColumn'

const AboutTemplate = () => {
  const post = this.props.data.markdownRemark
  const { headerTitle, headerSubtitle } = this.props.data.site.siteMetadata
  return (
    <div>
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
    }
  }
`
