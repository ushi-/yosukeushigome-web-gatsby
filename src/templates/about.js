import React from "react"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'

class AboutTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(post.html, 'singleByte')

    return (
      <div>
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
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`
