
import React from "react"
import Link from "gatsby-link"
import slugify from 'slug'
import {Helmet} from "react-helmet";

import MainColumn from '../components/mainColumn'
import Header from '../components/header'
import ProjectHeader from '../components/projectHeader'
import ScrollIndicator from '../components/scrollIndicator'

class ProjectTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      didMount: false
    }
  }
  componentDidMount = () => {
    this.setState({
      didMount: true
    })
  }
  render() {
    const project = this.props.data.markdownRemark
    const { title, tags, headerTitle, headerSubtitle } = project.frontmatter
    const {
      isProject,
      featuredImageBase64,
      featuredImageSrc,
      featuredImageSrcSet,
    } = project.fields
    const slug = slugify(title, {lower: true, })
    const siteTitle = title + ' | ' + this.props.data.site.siteMetadata.title
    const description = headerTitle + ' ' + headerSubtitle
    const ogpImage = featuredImageBase64
    return (
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
        <section
          className={"hero is-fullheight project-hero " + slug}
          css={{
            '::before': {
              backgroundImage: `url(${featuredImageBase64})`
            }
          }}>
          <div
            className="featured-image"
            style={{
              backgroundImage: `url(${featuredImageSrc})`,
            }}
           />
          <div className="hero-head">
            <Header
              title={headerTitle}
              subtitle={headerSubtitle}
              link={(
                <Link to={"/"} >See Other Projects</Link>
              )}
              animated={true}
            />
          </div>
          <div className="hero-body" />
          <div className="hero-foot">
            <div className="container has-text-centered scroll-indicator-container" >
              <ScrollIndicator />
            </div>
          </div>
        </section>
        <section className={"section project-content " + slug}>
          <MainColumn className="container-project-header">
            <ProjectHeader project={project} />
          </MainColumn>
          <MainColumn className="container-project-markdown">
            <div className="content" dangerouslySetInnerHTML={{ __html: project.html }} />
          </MainColumn>
        </section>
      </div>
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
        featuredImageBase64
        featuredImageSrc
        featuredImageSrcSet
      }
    }
  }
`
