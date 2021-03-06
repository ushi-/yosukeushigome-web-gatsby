import React from 'react'
import Link from 'gatsby-link'
import MediaQuery from 'react-responsive'

import Header from '../components/Header'
import Projects from '../components/Projects'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isProjectSelected: false,
    }
  }

  onProjectSelected() {
    this.setState({
      isProjectSelected: true,
    })
  }

  render() {
    const { isProjectSelected } = this.state
    const { title, headerTitle, headerSubtitle } = // eslint-disable-line
        this.props.data.site.siteMetadata // eslint-disable-line
    return (
      <MediaQuery minDeviceWidth={1224} minWidth={768}>
        {matches => (
          <div>
            <Header
              title={headerTitle}
              subtitle={headerSubtitle}
              link={<Link to={'/about'}>More about me</Link>}
              visible={!isProjectSelected}
              animate={isProjectSelected}
            />
            <Projects
              isDesktop={matches}
              projects={this.props.data.allMarkdownRemark.edges} // eslint-disable-line
              onProjectSelected={() => this.onProjectSelected()}
            />
          </div>
        )}
      </MediaQuery>
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
      sort: { fields: [id], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            isProject
          }
          frontmatter {
            title
            tags
            heroImage {
              childImageSharp {
                resolutions(width: 1600, quality: 90) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`
