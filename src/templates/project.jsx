
import React from 'react'
import Link from 'gatsby-link'
import slugify from 'slug'
import MediaQuery from 'react-responsive'
import classnames from 'classnames'

import MainColumn from '../components/MainColumn'
import Header from '../components/Header'
import HeroImageContainer from '../components/HeroImageContainer'
import ProjectHeader from '../components/ProjectHeader'
import ScrollIndicator from '../components/ScrollIndicator'
import Seo from '../components/Seo'

class ProjectTemplate extends React.Component { // eslint-disable-line
  render() {
    const project = this.props.data.markdownRemark // eslint-disable-line
    const {
      title,
      headerTitle,
      headerSubtitle,
      heroImage,
    } = project.frontmatter
    const image = {
      heroImageBase64: heroImage.childImageSharp.resolutions.base64,
      heroImageSrc: heroImage.childImageSharp.resolutions.src,
      heroImageSrcSet: heroImage.childImageSharp.resolutions.srcSet,
    }
    const sluggyTitle = slugify(title, { lower: true })
    return (
      <MediaQuery minDeviceWidth={1224} minWidth={768}>
        {matches => (
          <div>
            <Seo post={project} />
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
            <section className={`section project-content ${sluggyTitle}`}>
              <ProjectHeader project={project} />
              <MainColumn>
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
        heroImage {
          childImageSharp {
            resolutions(width: 1600, quality: 90) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
      }
      fields {
        slug
        isProject
      }
    }
  }
`
