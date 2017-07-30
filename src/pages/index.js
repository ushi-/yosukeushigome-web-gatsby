import React from "react"
import Link from "gatsby-link"

import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'

class Index extends React.Component {
  render() {
    console.log(this.props.data.allMarkdownRemark.edges);
    const projects = this.props.data.allMarkdownRemark.edges.map((post, i) =>
    <div className="is-project-index" key={i}>
      <ProjectHeader project={post.node} />
      <Link to={post.node.fields.slug}>
        <img src={post.node.fields.featuredImageUrl} />
      </Link>
    </div>
  )
    return (
      <div>
        <MainColumn>
          {projects}
        </MainColumn>
      </div>
    )
  }
}

export default Index

export const allProjectQuery = graphql`
  query ProjectPages {
    allMarkdownRemark(
      limit: 2000
      filter: { fields: { isProject: { eq: true } } }
    ) {
      edges {
        node {
          fields {
            slug
            featuredImageUrl
            isProject
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`
