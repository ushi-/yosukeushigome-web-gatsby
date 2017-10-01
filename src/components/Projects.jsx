import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { TrackDocument, Track } from 'react-track'
import { topTop } from 'react-track/tracking-formulas'

import Project from './Project'

const IMAGE_SHAPES = [
  [
    { top: 0, bottom: 70, left: 30, right: 10 },
    { top: 40, bottom: 0, left: 10, right: 50 },
  ],
  [
    { top: 30, bottom: 30, left: 5, right: 5 },
  ],
  [
    { top: 0, bottom: 70, left: 5, right: 55 },
    { top: 40, bottom: 30, left: 40, right: 15 },
    { top: 80, bottom: 0, left: 15, right: 5 },
  ],
  [
    { top: 0, bottom: 55, left: 5, right: 50 },
    { top: 50, bottom: 0, left: 20, right: 5 },
  ],
  [
    { top: 0, bottom: 0, left: 20, right: 20 },
  ],
]

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProject: undefined,
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
