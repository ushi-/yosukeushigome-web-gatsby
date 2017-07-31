import React from "react"
import Link from "gatsby-link"

import Header from '../components/header'
import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'

class Index extends React.Component {
  render() {
    const projects = this.props.data.allMarkdownRemark.edges.map((post, i) =>
    <div className="project-index" key={i}>
      <ProjectHeader project={post.node} />
      <Link to={post.node.fields.slug}>
        <img src={post.node.fields.featuredImageUrl} />
      </Link>
    </div>
  )
    const { headerTitle, headerSubtitle } = this.props.data.site.siteMetadata
    const aboutLink = (
      <Link to={"/about"}>More about me</Link>
    )
    return (
      <div>
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          link={aboutLink} />
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
    site {
      siteMetadata {
        title
        headerTitle
        headerSubtitle
      }
    }
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
