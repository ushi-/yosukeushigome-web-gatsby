import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TrackDocument, TrackedDiv} from 'react-track'
import {topTop, bottomTop, calculateScrollY, getDocumentRect} from 'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import classnames from 'classnames'

import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'
import utils from '../utils'

class ProjectHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      windowHeight: 0,
    }
  }
  componentDidMount() {
    this.handleResize()
    window.addEventListener("resize", this.handleResize)
    this.setState({ elementHeight: this.divRef.clientHeight })
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }
  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight
    })
  }
  render() {
    const { windowHeight, elementHeight } = this.state
    const { project, containerOriginY, shouldHide } = this.props
    const { title } = project.frontmatter
    return (
      <TrackDocument formulas={[topTop, calculateScrollY, getDocumentRect]}>
      {(topTop, scrollY, rect) =>
        <TrackedDiv
          formulas={[topTop]}
          className="project-index-wrapper"
          style={{ height: elementHeight ? elementHeight : null}}>
        {(posTopTop) => {
          const pin = scrollY > posTopTop - containerOriginY
          const unpin = scrollY > posTopTop - containerOriginY + windowHeight
          return (
            <section className={classnames(
              'section',
              'project-index',
              title.replace(' ', '-').toLowerCase(),
              {
                'pin': pin,
                'unpin': unpin
              },
              {
                'hide': shouldHide,
              })}
              style={{
                top: unpin ? windowHeight : (pin ? containerOriginY : 0)
              }}
              ref={element => this.divRef = element}>
              <MainColumn>
                <ProjectHeader project={project} />
              </MainColumn>
            </section>
          )}
        }</TrackedDiv>
      }</TrackDocument>
    )
  }
}

ProjectHeaderContainer.propTypes = {
  project: PropTypes.object,
  containerOriginY: PropTypes.number,
  shouldHide: PropTypes.bool,
}

ProjectHeaderContainer.defaultProps = {
  shouldHide: false
}

export default ProjectHeaderContainer
