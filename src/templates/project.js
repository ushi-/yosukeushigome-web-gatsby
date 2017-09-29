
import React from "react"
import Link from "gatsby-link"
import slugify from 'slug'
import {Helmet} from "react-helmet";

import MainColumn from '../components/mainColumn'
import Header from '../components/header'
import HeroImageContainer from '../components/heroImageContainer'
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
    const image = project.fields
    const slug = slugify(title, {lower: true, })
    const siteTitle = title + ' | ' + this.props.data.site.siteMetadata.title
    const description = headerTitle + ' ' + headerSubtitle
    const ogpImage = image.featuredImageSrc
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
        <HeroImageContainer
          isDesktop={true}
          image={image}
          isBordered={false}
          head={(
            <Header
              title={headerTitle}
              subtitle={headerSubtitle}
              link={(<Link to={"/"} >See Other Projects</Link>)}
              animated={true}
            />
          )}
          foot={(
            <div className="container has-text-centered scroll-indicator-container" >
              <ScrollIndicator />
            </div>
          )}
        />
        <section className={"section project-content " + slug}>
          <ProjectHeader project={project} />
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
