import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TrackDocument, TrackedDiv} from 'react-track'
import {topTop, bottomTop, calculateScrollY, getDocumentRect} from 'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import classnames from 'classnames'

import MainColumn from '../components/mainColumn'
import ProjectHeader from '../components/projectHeader'
import utils from '../utils'

class IndexProjectHeader extends Component {
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
    const { project } = this.props
    const { title } = project.frontmatter
    return (
      <TrackDocument formulas={[topTop, bottomTop, calculateScrollY, getDocumentRect]}>
        {(topTop, bottomTop, scrollY, rect) =>
          <TrackedDiv
            formulas={[topTop, bottomTop]}
            className="project-index-wrapper"
            style={{ height: elementHeight ? elementHeight : null}}>
            {(posTopTop, posBottomTop) =>
              <section className={classnames(
                'section', 'project-index', title.replace(' ', '-').toLowerCase(), {
                  'pin': scrollY > posTopTop,
                  'unpin': scrollY > posTopTop + windowHeight })}
                style={{
                  top: scrollY > posTopTop + windowHeight ? windowHeight : 0
                }}
                ref={element => this.divRef = element}>
                <MainColumn>
                  <ProjectHeader project={project} />
                </MainColumn>
              </section>
            }
          </TrackedDiv>
        }
      </TrackDocument>
    )
  }
}

IndexProjectHeader.propTypes = {
  project: PropTypes.object
}

export default IndexProjectHeader
