import React from 'react'
import PropTypes from 'prop-types'

import MainColumn from './mainColumn'
import Tags from './tags'

const ProjectHeader = ({ project }) => (
  <MainColumn>
    <div className="project-header">
      <h1 className="title is-1">{project.frontmatter.title}</h1>
      <Tags tags={project.frontmatter.tags} />
    </div>
  </MainColumn>
)

ProjectHeader.propTypes = {
  project: PropTypes.object
}

export default ProjectHeader
