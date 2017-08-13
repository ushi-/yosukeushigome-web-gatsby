import React from "react"
import Link, { navigateTo } from "gatsby-link"
import {TrackDocument, Track} from 'react-track'
import {topTop} from 'react-track/tracking-formulas'

import Header from '../components/header'
import IndexProject from '../components/indexProject'
import utils from '../utils'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const projectsContainer = (
      <TrackDocument formulas={[topTop]}>
      {(topTop) =>
        <Track component="div" formulas={[topTop]}>
        {(Div, posTopTop) =>
          <Div>
            {this.props.data.allMarkdownRemark.edges.map((post, i) => {
              const motionThumbnailProps = utils.motionThumbnailProps[i % utils.motionThumbnailProps.length]
              return (
                <IndexProject
                  project={post.node}
                  thumbnailParams={motionThumbnailProps}
                  containerOriginY={posTopTop} />
              )})}
          </Div>
        }</Track>
      }</TrackDocument>
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
        {projectsContainer}
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
