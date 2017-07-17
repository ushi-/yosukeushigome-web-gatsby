import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

const MainColumn = ({ children }) => (
  <div className="container">
    <Grid fluid>
      <Row around="sm">
        <Col md={12} lg={8}>
          {children}
        </Col>
      </Row>
    </Grid>
  </div>
)

MainColumn.propTypes = {
  children: React.PropTypes.any
}

export default MainColumn
