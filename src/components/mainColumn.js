import React from 'react'

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
  children: React.PropTypes.any,
  className: React.PropTypes.string
}

MainColumn.defaultProps = {
  className: ""
}

export default MainColumn
