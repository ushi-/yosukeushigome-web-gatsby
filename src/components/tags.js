import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags }) => {
  let tagList = tags.map((projectTag, i) =>
    <p key={projectTag}>
      # {projectTag}
    </p>
  )
  return (
    <div className="is-tags">
      {tagList}
    </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.array
}

export default Tags
