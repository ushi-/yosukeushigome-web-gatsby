import React from 'react'
import PropTypes from 'prop-types'

const Tags = ({ tags }) => (
  <div className="tags">
    {tags.map((tag, i) => (
      <span key={tag} className="tag">
        {tag}
      </span>
    ))}
  </div>
)

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Tags
