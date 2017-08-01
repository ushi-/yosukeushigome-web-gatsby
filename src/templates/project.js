import React from "react"
import Link from "gatsby-link"

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'
import Header from '../components/header'
import ProjectHeader from '../components/projectHeader'
import Carousel from '../components/carousel'

class ProjectTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark
    const { title, tags, headerSubtitle } = project.frontmatter
    const { isProject, featuredImageUrl, carousel} = project.fields
    const html = wrapSingleByteTexts(project.html, 'singleByte')
    return (
      <div>
        <section className="hero is-fullheight project-hero" style={{
            backgroundImage: `url(${featuredImageUrl})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
        }}>
          <div className="hero-head">
            <Header
              title={"This is " + title + " project."}
              subtitle={headerSubtitle}
              link={(
                <Link to={"/"} >See Other Projects</Link>
            )}/>
          </div>
          <div className="hero-body" />
          <div className="hero-foot">
            <div className="container has-text-centered" >
              <span className="icon is-medium">
                <i className="fa fa-angle-down"></i>
              </span>
            </div>
          </div>
        </section>
        <section className={"section project-content " +  title.replace(' ', '-').toLowerCase()}>
          <MainColumn>
            <ProjectHeader project={project} />
          </MainColumn>
          <div className="container is-fluid">
            <Carousel urls={carousel}/>
          </div>
          <MainColumn>
            <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
          </MainColumn>
        </section>
      </div>
    )
  }
}

export default ProjectTemplate

export const projectPageQuery = graphql`
  query ProjectPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        tags
        headerSubtitle
      }
      fields {
        isProject
        featuredImageUrl
        carousel
      }
    }
  }
`
