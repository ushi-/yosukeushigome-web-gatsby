import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ProjectHeader from '../components/ProjectHeader'

class ProjectHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: null,
    }
  }
  componentDidMount() {
    this.setState({
      height: this.divRef.clientHeight,
    })
  }
  render() {
    const { height } = this.state
    const { project, hidden, pinned, unpinned, top } = this.props
    return (
      <div
        className="project-header-container-wrapper"
        style={{ height }}
      >
        <section
          className={classnames(
            'section',
            'project-header-container',
            {
              pin: pinned,
              unpin: unpinned,
              hide: hidden,
            })}
          style={{ top }}
          ref={element => this.divRef = element} // eslint-disable-line
        >
          <ProjectHeader project={project} />
        </section>
      </div>
    )
  }
}

ProjectHeaderContainer.propTypes = {
  project: PropTypes.object.isRequired, // eslint-disable-line
  hidden: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,
  unpinned: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
}

export default ProjectHeaderContainer
