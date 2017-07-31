import React from "react"
import Link from "gatsby-link"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import Header from '../components/header'
import MainColumn from '../components/mainColumn'

class AboutTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(post.html, 'singleByte')
    const { headerTitle, headerSubtitle } = this.props.data.site.siteMetadata
    return (
      <div>
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          link={(
            <Link to={"/"} >Less about me</Link>
        )}/>
        <MainColumn>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </MainColumn>
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
    }
  }
`
