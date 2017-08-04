import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from "react-dom"
import { Motion, spring } from "react-motion"
import Link, { navigateTo } from "gatsby-link"

class MotionThumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldExpand: false,
      originTop: 0,
      windowHeight: window.innerHeight,
      windowRatio: window.innerHeight / window.innerWidth
    }
  }
  handleClick = () => {
    const clientRect = findDOMNode(this).getBoundingClientRect()
    this.setState({
      shouldExpand: true,
      originTop: clientRect.top,
      windowHeight: window.innerHeight,
      windowRatio: window.innerHeight / window.innerWidth
    })
  }
  render() {
    const { image, slug, offset, width, shape } = this.props
    const { shouldExpand, originTop, windowRatio } = this.state
    let ratio = 1
    switch (shape) {
      case 'horizontal':
        ratio = 9/16
        break
      case 'bar':
        ratio = 1/3
        break
      case 'portrait':
        ratio = 4/3
        break
      case 'circle':
        ratio = 1
        break
      default:
    }
    const height = width * ratio / windowRatio
    const radius = shape === 'circle' ? width / 2.0 : 0
    return (
      <Motion
        style={{x: spring(shouldExpand ? 1 : 0)}}
        onRest={() => {
          navigateTo(slug)
        }}>
        {({x}) => {
          return (<div
            className="motion-thumbnail-background"
            style={{
              backgroundImage: `url(${image})`,
              position: shouldExpand ? 'fixed' : 'relative',
              width: `${width + (100-width) * shouldExpand * x}%`,
              height: `${height + (100-height) * shouldExpand * x}vh`,
              marginLeft: `${offset - offset * shouldExpand * x}%`,
              borderRadius: `${radius - radius * shouldExpand * x}vw`,
              top: `${shouldExpand ? originTop * (1 - x) : 0}`,
              borderWidth: `${shouldExpand ? (1-x) : 1}px`,
              zIndex: `${shouldExpand ? 1 : 0}`
            }}>
            <div
              className="motion-thumbnail-foreground"
              onClick={this.handleClick} />
          </div>)
        }}
      </Motion>
    )
  }
}

MotionThumbnail.prototypes = {
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  offset: PropTypes.number,
  width: PropTypes.number,
  shape: PropTypes.oneOf(['horizontal', 'bar', 'portrait', 'circle'])
}

MotionThumbnail.defaultProps = {
  offset: 30,
  width: 40,
  shape: 'portrait'
}

export default MotionThumbnail
