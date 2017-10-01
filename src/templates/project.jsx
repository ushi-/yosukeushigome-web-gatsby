
import React from 'react'
import Link from 'gatsby-link'
import slugify from 'slug'
import { Helmet } from 'react-helmet'
import MediaQuery from 'react-responsive'
import classnames from 'classnames'

import MainColumn from '../components/MainColumn'
import Header from '../components/Header'
import HeroImageContainer from '../components/HeroImageContainer'
import ProjectHeader from '../components/ProjectHeader'
import ScrollIndicator from '../components/ScrollIndicator'

class ProjectTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didMount: false,
    }
  }
  componentDidMount() {
    this.setState({
      didMount: true,
    })
  }
  render() {
    const project = this.props.data.markdownRemark // eslint-disable-line
    const { title, headerTitle, headerSubtitle } = project.frontmatter
    const image = project.fields
    const slug = slugify(title, { lower: true })
    const siteTitle = `${title} | ${this.props.data.site.siteMetadata.title}` // eslint-disable-line
    const description = `${headerTitle} ${headerSubtitle}`
    const ogpImage = image.heroImageSrc
    return (
      <MediaQuery minDeviceWidth={1224} minWidth={768}>
        {matches => (
          <div>
            <Helmet>
              <title>{siteTitle}</title>
              <meta property="og:title" content={siteTitle} />
              <meta name="twitter:title" content={siteTitle} />
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
              <meta name="twitter:description" content={description} />
              <meta property="og:image" content={ogpImage} />
              <meta name="twitter:image" content={ogpImage} />
            </Helmet>
            <HeroImageContainer
              isDesktop={matches}
              image={image}
              isBordered={false}
              head={(
                <Header
                  title={headerTitle}
                  subtitle={headerSubtitle}
                  link={(<Link to={'/'}>See Other Projects</Link>)}
                  animated
                  borderPersistent
                />
              )}
              foot={(
                <div
                  className={classnames(
                    'container',
                    'has-text-centered',
                    'scroll-indicator-container',
                  )}
                >
                  <ScrollIndicator />
                </div>
              )}
            />
            <section className={`section project-content ${slug}`}>
              <ProjectHeader project={project} />
              <MainColumn className="container-project-markdown">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: project.html }} // eslint-disable-line
                />
              </MainColumn>
            </section>
          </div>
        )}
      </MediaQuery>
    )
  }
}

export default ProjectTemplate

export const projectPageQuery = graphql`
  query ProjectPageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        tags
        headerTitle
        headerSubtitle
      }
      fields {
        isProject
        heroImageBase64
        heroImageSrc
        heroImageSrcSet
      }
    }
  }
`
