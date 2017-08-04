import React from "react"
import Link, { navigateTo } from "gatsby-link"

import Header from '../components/header'
import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'
import MotionThumbnail from '../components/motionThumbnail'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const projects = this.props.data.allMarkdownRemark.edges.map((post, i) => {
      const { featuredImageUrl, slug } = post.node.fields
      const { title } = post.node.frontmatter
      return (
        <div key={i}>
          <section className={"section project-index-" + title.replace(' ', '-').toLowerCase()} key={i} style={{
          }}>
            <MainColumn>
              <ProjectHeader project={post.node} />
            </MainColumn>
            <div className="container">
            </div>
          </section>
          <div className="columns is-desktop" style={{
            height: "100vh",
          }}>
            <MotionThumbnail image={featuredImageUrl} slug={slug} />
          </div>
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
