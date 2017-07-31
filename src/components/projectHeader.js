import React from 'react'
import PropTypes from 'prop-types'

import Tags from './tags'

const ProjectHeader = ({ project }) => (
  <div className="project-header">
    <h1 className="title is-1">{project.frontmatter.title}</h1>
    <Tags tags={project.frontmatter.tags} />
  </div>
)

ProjectHeader.propTypes = {
  project: PropTypes.object
}

export default ProjectHeader
