import React from "react"
import Link from "gatsby-link"

import Header from '../components/header'
import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'

class Index extends React.Component {
  render() {
    const projects = this.props.data.allMarkdownRemark.edges.map((post, i) => {
    const { featuredImageUrl, slug } = post.node.fields
    const { title } = post.node.frontmatter
    return (
      <div>
        <section className={"section project-index" + title.replace(' ', '-').toLowerCase()} key={i}>
          <MainColumn>
            <ProjectHeader project={post.node} />
          </MainColumn>
        </section>
        <Link to={slug}>
          <div className="columns is-desktop">
            <div className="column is-8" style={{
              backgroundImage: `url(${featuredImageUrl})`,
              backgroundAttachment: 'fixed',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              height: "0",
              paddingTop: "50%",
              borderRadius: "100"
            }} />
          </div>
        </Link>
      </div>
    )
  })
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
        {projects}
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
