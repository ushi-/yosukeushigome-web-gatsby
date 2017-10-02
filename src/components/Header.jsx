import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import classnames from 'classnames'

import MainColumn from './MainColumn'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      canAnimate: true,
    }
  }
  componentWillMount() {
    const { visible, animated } = this.props
    if (visible && animated) {
      this.setState({
        visible: false,
        canAnimate: false,
      })
    }
  }
  componentDidMount() {
    const { visible, animated } = this.props
    if (visible && animated) {
      this.setVisible()
    }
  }
  setVisible() {
    this.setState({
      visible: true,
      canAnimate: true,
    })
  }
  render() {
    const { title, subtitle, link, visible, animated, borderPersistent } = this.props
    return (
      <Headroom
        style={{ zIndex: '3' }}
        className={classnames(
          {
            show: visible && this.state.visible,
            hide: !(visible && this.state.visible),
          },
          { animate: animated && this.state.canAnimate },
        )}
      >
        <section
          className={classnames(
            'header',
            'section',
            { bordered: borderPersistent },
          )}
        >
          <MainColumn>
            <h1 className="title is-1">{title}</h1>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h2 className="title is-2">{subtitle}</h2>
                </div>
              </div>
              <div className="level-right">
                <div
                  className="level-item has-text-right"
                  style={{ marginLeft: '2rem' }}
                >
                  <h2 className="title is-2">{link}</h2>
                </div>
              </div>
            </div>
          </MainColumn>
        </section>
      </Headroom>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  link: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  animated: PropTypes.bool,
  borderPersistent: PropTypes.bool,
}

Header.defaultProps = {
  visible: true,
  animated: false,
  borderPersistent: false,
}

export default Header
