import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ProjectHeader from '../components/projectHeader'

class ProjectHeaderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: null,
    }
  }
  componentDidMount() {
    this.setState({
      height: this.divRef.clientHeight
    })
  }
  render() {
    const { height } = this.state
    const { project, hidden, pinned, unpinned, top } = this.props
    return (
      <div
        className="project-header-container-wrapper"
        style={{ height: height}}
      >
        <section className={classnames(
          'section',
          'project-header-container',
          {
            'pin': pinned,
            'unpin': unpinned,
            'hide': hidden,
          })}
          style={{
            top: top,
          }}
          ref={element => this.divRef = element}
        >
          <ProjectHeader project={project} />
        </section>
      </div>
    )
  }
}

ProjectHeaderContainer.propTypes = {
  project: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  pinned: PropTypes.bool.isRequired,
  unpinned: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
}

export default ProjectHeaderContainer
