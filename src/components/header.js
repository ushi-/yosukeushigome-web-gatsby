import React from 'react'
import PropTypes from "prop-types"

import Link from "gatsby-link"

import MainColumn from './mainColumn'

class Header extends React.Component {
  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    const { pathname } = this.props.location
    const isAbout = pathname === "/about"

    return (
      <header className="header">
        <MainColumn>
          <div>
            <h1 className="title is-1">I’m Yosuke Ushigome, a creative technologist based in London.</h1>
          </div>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title is-2">I demystify emerging technology through prototyping.</h2>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item has-text-right"  style={{marginLeft: '2rem'}}>
                <h2 className="title is-2"><Link to={isAbout ? "/" : "/about"}>{isAbout ? "Less" : "More"} about me</Link></h2>
              </div>
            </div>
          </div>
        </MainColumn>
      </header>
    )
  }
}

export default Header
