import React from 'react'
import PropTypes from 'prop-types'

const MainColumn = ({ children, className }) => (
  <div className={`container ${className}`}>
    <div className="columns is-desktop">
      <div className="column is-8 is-offset-2">
        {children}
      </div>
    </div>
  </div>
)

MainColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

MainColumn.defaultProps = {
  children: undefined,
  className: '',
}

export default MainColumn
