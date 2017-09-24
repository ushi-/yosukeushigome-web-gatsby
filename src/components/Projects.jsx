import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from "gatsby-link"
import {TrackDocument, Track} from 'react-track'
import {topTop} from 'react-track/tracking-formulas'

import Project from './Project'
import utils from '../utils'

class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProject: null,
    }
  }

  onProjectSelected = (project) => {
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
                heroImageShapes={[]}
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
