import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { TrackDocument, Track } from 'react-track'
import { topTop } from 'react-track/tracking-formulas'

import Project from './Project'

const IMAGE_SHAPES = [
  [
    { top: 0, bottom: 80, left: 30, right: 20 },
    { top: 40, bottom: 0, left: 10, right: 70 },
  ],
  [
    { top: 20, bottom: 20, left: 30, right: 30 },
  ],
  [
    { top: 40, bottom: 40, left: 10, right: 10 },
  ],
]

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProject: null,
    }
  }

  onProjectSelected(project) {
    this.setState({
      selectedProject: project,
    })
    this.props.onProjectSelected()
  }

  onSelectionAnimationRest(project) {
    if (project === this.state.selectedProject) {
      navigateTo(project.fields.slug)
    }
  }

  render() {
    const { projects, isDesktop } = this.props
    const heroImageShapes = []
    for (let i = 0; i < projects.length; i++) {
      heroImageShapes.push(IMAGE_SHAPES[i % IMAGE_SHAPES.length])
    }
    const { selectedProject } = this.state
    return (
      <TrackDocument formulas={[topTop]}>
        {topTop => (
          <Track component="div" formulas={[topTop]}>
            {(Div, posTopTop) => (
              <Div>
                {projects.map((project, i) => (
                  <Project
                    key={project.node.fields.slug}
                    isDesktop={isDesktop}
                    project={project.node}
                    heroImageShapes={heroImageShapes[i]}
                    projectsTopTop={posTopTop}
                    onSelection={() => this.onProjectSelected(project.node)}
                    selectedProject={selectedProject}
                    onSelectionAnimationRest={() =>
                      this.onSelectionAnimationRest(project.node)}
                  />
                ))}
              </Div>
            )}
          </Track>
        )}
      </TrackDocument>
    )
  }
}

Projects.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProjectSelected: PropTypes.func.isRequired,
}

export default Projects
