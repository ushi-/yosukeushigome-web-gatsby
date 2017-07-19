import React from "react"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'

class ProjectTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(post.html, 'singleByte')
    let tags = post.frontmatter.projectTags.map((projectTag, i) =>
      <p key={projectTag}>
        # {projectTag}
      </p>
    )
    return (
      <div>
        <MainColumn>
          <div className="is-project-header">
            <h1 className="title is-1">{post.frontmatter.title}</h1>
            <div className="is-tags">{tags}</div>
          </div>
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
        projectTags
      }
    }
  }
`
