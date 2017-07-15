import React from "react"
import { Grid, Row, Col } from 'react-flexbox-grid';

class AboutTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
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
