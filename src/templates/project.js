import React from "react"
import Link from "gatsby-link"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'

class ProjectTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(project.html, 'singleByte')
    const carousel = project.fields.carousel.map((url, i) =>
      <img src={url} key={i} />
    )
    return (
      <div>
        <MainColumn>
          <ul>{carousel}</ul>
          <ProjectHeader project={project} />
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </MainColumn>
      </div>
    )
  }
}

export default ProjectTemplate

export const projectPageQuery = graphql`
  query ProjectPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        tags
      }
      fields {
        isProject
        featuredImageUrl
        carousel
      }
    }
  }
`
