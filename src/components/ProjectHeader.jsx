import React from 'react'
import PropTypes from 'prop-types'

import MainColumn from './MainColumn'
import Tags from './Tags'

const ProjectHeader = ({ project }) => (
  <MainColumn>
    <div className="project-header">
      <h1 className="title is-1">{project.frontmatter.title}</h1>
      <Tags tags={project.frontmatter.tags} />
    </div>
  </MainColumn>
)

ProjectHeader.propTypes = {
  project: PropTypes.object, // eslint-disable-line
}

export default ProjectHeader
