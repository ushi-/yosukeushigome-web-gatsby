import React from "react"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'

import testImage from '../pages/projects/omotenashi_mask/images/index.jpg'

class ProjectTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const html = wrapSingleByteTexts(post.html, 'singleByte')
    // let tags = post.frontmatter.tags.map((projectTag, i) =>
    //   <p key={projectTag}>
    //     # {projectTag}
    //   </p>
    // )
    console.log(post.frontmatter);
    let imagePath = "../pages/" + post.frontmatter.indexImage.relativePath
    // import image from imagePath
    // console.log(imagePath);
    return (
      <div>
        <MainColumn>
          <img src={post.frontmatter.indexImage.absolutePath} />
          <img src={testImage} />
          <div className="is-project-header">
            <h1 className="title is-1">{post.frontmatter.title}</h1>
            {/* <div className="is-tags">{tags}</div> */}
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
        tags
        indexImage {
          name
          relativePath
          absolutePath
        }
      }
    }
  }
`
