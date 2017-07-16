import React from "react"
import { Grid, Row, Col } from 'react-flexbox-grid';
import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'

class AboutTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(post.html, 'singleByte')

    return (
      <div>
        <Grid fluid>
          <Row around="sm">
            <Col sm={12} md={8}>
              <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
            </Col>
          </Row>
        </Grid>
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
