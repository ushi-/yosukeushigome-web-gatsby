import React from "react"
import { Grid, Row, Col } from 'react-flexbox-grid';

class Index extends React.Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={6} md={3}>
              react-flexbox-grid is a set of React components that implement flexboxgrid.css. It even has an optional support for CSS Modules with some extra configuration.

            </Col>
          </Row>
        </Grid>
        <h1 className="tu">Hi sassy friends</h1>
        <div className="sass-nav-example">
          <h2>Nav example</h2>
          <ul className="pa0 ma0 list">
            <li>
              <a href="#">Store</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
            <li>
              <a href="https://github.com/gatsbyjs/gatsby/tree/1.0/examples/using-sass">
                Code for site on Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Index
