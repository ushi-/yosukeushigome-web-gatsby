import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from "gatsby-link"
import {TrackDocument, Track} from 'react-track'
import {topTop} from 'react-track/tracking-formulas'

import Project from './Project'

const IMAGE_SHAPES = [
  [
    {top: 0, bottom: 80, left: 30, right: 20},
    {top: 40, bottom: 0, left: 10, right: 70},
  ],
  [
    {top: 20, bottom: 20, left: 30, right: 30},
  ],
  [
    {top: 40, bottom: 40, left: 10, right: 10},
  ],
]

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProject: null,
      heroImageShapes: [],
    }
  }

  componentDidMount() {
    const { projects } = this.props
    const heroImageShapes = []
    for (let i = 0; i < projects.length; i++) {
      heroImageShapes.push(IMAGE_SHAPES[i % IMAGE_SHAPES.length])
    }
    this.setState({
      heroImageShapes: heroImageShapes,
    })
  }

  onProjectSelected = (project) => {
    navigateTo(project.fields.slug)
    this.setState({
      selectedProject: project
    })
    this.props.onProjectSelected()
  }

  onSelectionAnimationRest = () => {
    const { project } = this.state
    navigateTo(project.fields.slug)
  }

  render() {
    const { projects, isDesktop } = this.props
    const { selectedProject } = this.state
    return (
      <TrackDocument formulas={[topTop]}>
      {(topTop) =>
        <Track component="div" formulas={[topTop]}>
        {(Div, posTopTop) =>
          <Div>
            {projects.map((project, i) =>
              <Project
                key={i}
                isDesktop={isDesktop}
                project={project.node}
                heroImageShapes={this.state.heroImageShapes[i]}
                projectsTopTop={posTopTop}
                onSelection={() => this.onProjectSelected(project.node)}
                selectedProject={selectedProject}
                onSelectionAnimationRest={this.onSelectionAnimationRest}
              />
            )}
          </Div>
        }</Track>
      }</TrackDocument>
    )
  }
}

Projects.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  onProjectSelected: PropTypes.func.isRequired,
}

export default Projects
