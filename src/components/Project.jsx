import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TrackDocument, Track } from 'react-track'
import { topTop, bottomTop, calculateScrollY } from
    'react-track/tracking-formulas'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import HeroImageContainer from './heroImageContainer'

class Project extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      project,
      heroImageShapes,
      projectsTopTop,
      onSelection,
      selectedProject,
      onSelectionAnimationRest,
    } = this.props
    const image = project.fields
    const isAnyProjectSelected = selectedProject ? true : false
    const isSelected = selectedProject === project
    return (
      <div>
        <TrackDocument formulas={[ topTop, bottomTop, calculateScrollY ]}>
        {( topTop, bottomTop, scrollY ) =>
          <Track component="div" formulas={[ topTop, bottomTop ]}>
          {(Div, posTopTop, posBottomTop) => {
            const pinned = posTopTop < scrollY + projectsTopTop
            const unpinned = posBottomTop < scrollY + projectsTopTop
            const height = posBottomTop - posTopTop
            const top = unpinned ? height : (pinned ? projectsTopTop : 0)
            return (
              <Div>
                <ProjectHeaderContainer
                  project={project}
                  hidden={isAnyProjectSelected}
                  pinned={pinned}
                  unpinned={unpinned}
                  top={top}
                />
                <div
                  className="hero is-fullheight"
                  style={{backgroundColor: '#ff0000'}}
                />
                {/* <HeroImageContainer
                  image={image}
                  imageShapes={heroImageShapes}
                  onClick={onSelection}
                  hidden={isAnyProjectSelected ? !isSelected : false}
                  onAnimationRest={onSelectionAnimationRest}
                /> */}
              </Div>
            )
          }}</Track>
        }</TrackDocument>
        <ProjectHeaderContainer
          project={project}
          hidden={true}
          pinned={false}
          unpinned={false}
          top={0}
        />
      </div>
    )
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  heroImageShapes: PropTypes.array.isRequired,
  projectsTopTop: PropTypes.number.isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  onSelectionAnimationRest: PropTypes.func.isRequired,
}

export default Project
