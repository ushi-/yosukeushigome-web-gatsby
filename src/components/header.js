import React from 'react'
import PropTypes from "prop-types"

import Headroom from "react-headroom"

import MainColumn from './mainColumn'

const Header = ({ title, subtitle, link }) => (
  <Headroom>
    <section className="header section">
      <MainColumn>
        <h1 className="title is-1">{title}</h1>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h2 className="title is-2">{subtitle}</h2>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item has-text-right"  style={{marginLeft: '2rem'}}>
              <h2 className="title is-2">{link}</h2>
            </div>
          </div>
        </div>
      </MainColumn>
    </section>
  </Headroom>
)

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.element,
}

export default Header
