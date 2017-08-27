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
    this.state = {
      projectSelected: false,
      motionThumbnailPropIndeces: new Array(100).fill(undefined).map((val,idx) => utils.randomBetween(0, utils.motionThumbnailProps.length - 1))
    }
  }
  handleClick = () => {
    this.setState({
      projectSelected: true
    })
  }
  componentDidMount = () => {
    console.log(this.state.motionThumbnailPropIndeces);
  }
  render() {
    const projectsContainer = (
      <TrackDocument formulas={[topTop]}>
      {(topTop) =>
        <Track component="div" formulas={[topTop]}>
        {(Div, posTopTop) =>
          <Div>
            {this.props.data.allMarkdownRemark.edges.map((post, i) => {
              const motionThumbnailProps = utils.motionThumbnailProps[this.state.motionThumbnailPropIndeces[i]]
              return (
                <IndexProject
                  key={i}
                  project={post.node}
                  thumbnailParams={motionThumbnailProps}
                  containerOriginY={posTopTop}
                  onClick={this.handleClick}
                  shouldHide={this.state.projectSelected} />
              )})}
          </Div>
        }</Track>
      }</TrackDocument>
    )
    const { projectSelected } = this.state
    const { title, headerTitle, headerSubtitle } = this.props.data.site.siteMetadata
    const aboutLink = (
      <Link to={"/about"}>More about me</Link>
    )
    return (
      <div>
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          link={aboutLink}
          visible={!projectSelected}
          animate={projectSelected} />
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
      sort: { fields: [id], order: DESC }
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
