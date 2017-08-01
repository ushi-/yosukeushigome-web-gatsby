import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags }) => {
  let tagList = tags.map((projectTag, i) =>
    <span key={projectTag} className="tag">
      {projectTag}
    </span>
  )
  return (
    <div className="tags">
      {tagList}
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.array
}

export default Tags
