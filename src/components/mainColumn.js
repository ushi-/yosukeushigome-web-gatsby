import React from 'react'

const MainColumn = ({ children }) => (
  <div className="container">
    <div className="columns is-desktop">
      <div className="column is-8 is-offset-2">
        {children}
      </div>
    </div>
  </div>
)

MainColumn.propTypes = {
  children: React.PropTypes.any
}

export default MainColumn
