import React from "react"
import Link from "gatsby-link"
import {TrackDocument, Track} from 'react-track'
import {bottomTop, calculateScrollY} from 'react-track/tracking-formulas'
import {tween} from 'react-imation'
import {translate3d} from 'react-imation/tween-value-factories'
import slugify from 'slug'

import wrapSingleByteTexts from '../utils/wrapSingleByteTexts'
import MainColumn from '../components/mainColumn'
import Header from '../components/header'
import ProjectHeader from '../components/projectHeader'
import Carousel from '../components/carousel'
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
    const { isProject, featuredImageUrl, carousel} = project.fields
    const html = wrapSingleByteTexts(project.html, 'singleByte')
    const slug = slugify(title, {lower: true, })
    return (
      <div>
        <TrackDocument formulas={[bottomTop, calculateScrollY]}>
        {(bottomTop, scrollY) =>
          <Track component="section" formulas={[bottomTop]}>
          {(Section, posBottomTop) => {
            const translateTween = tween(scrollY, [
              [0, {transform: translate3d(0, 0, 0)}],
              [posBottomTop, {transform: translate3d(0, this.state.didMount ? -100 : 0, 0)}]
            ])
            return (
              <Section
                className={"hero is-fullheight project-hero " + slug}
                css={{
                  '::before': {
                    backgroundImage: `url(${featuredImageUrl})`,
                    ...translateTween
                  }
                }}>
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
              </Section>
            )}
          }</Track>
        }</TrackDocument>
        <section className={"section project-content " + slug}>
          <MainColumn>
            <ProjectHeader project={project} />
          </MainColumn>
          <div className="container container-carousel is-fluid">
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
        headerTitle
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
