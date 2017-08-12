import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from "react-dom"
import { Motion, spring } from "react-motion"
import Link, { navigateTo } from "gatsby-link"
import {TrackDocument, Track} from 'react-track'
import {topTop, calculateScrollY, getDocumentRect} from 'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import {scale, px, translate3d} from 'react-imation/tween-value-factories'

import utils from '../utils'

class MotionThumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldExpand: false,
      windowHeight: 0
    }
  }
  componentDidMount() {
    this.handleResize()
    window.addEventListener("resize", this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }
  handleResize = () => {
    this.setState({
      windowHeight: window.innerHeight
    })
  }
  handleClick = () => {
    this.setState({
      shouldExpand: true,
    })
  }
  render() {
    const { image, slug, wrapperPos, offset, width, height, shape } = this.props
    const { shouldExpand, windowHeight } = this.state
    return (
      <Motion
        style={{x: spring(shouldExpand ? 1 : 0)}}
        onRest={() => {
          navigateTo(slug)
        }}>
        {({x}) =>
        <TrackDocument formulas={[topTop, calculateScrollY, getDocumentRect]}>
          {(topTop, scrollY, rect) =>
            <Track component="div" formulas={[topTop]}>
              {(Div, posTopTop) => {
                let ratio = 1
                switch (shape) {
                  case 'horizontal':
                    ratio = 9/16
                    break
                  case 'bar':
                    ratio = 1/4
                    break
                  case 'portrait':
                    ratio = 4/3
                    break
                  case 'circle':
                    ratio = 1
                    break
                  default:
                }
                let widthPx = width * rect.width / 100
                let heightPx = widthPx * ratio
                let marginTop = (windowHeight * height / 100 - heightPx) / 2
                if (windowHeight * height / 100 < heightPx) {
                  heightPx = windowHeight * height / 100
                  widthPx = heightPx / ratio
                  marginTop = 0
                }

                const radius = shape === 'circle' ? widthPx / 2.0 : 0
                const translateTween = tween(scrollY, [
                  [wrapperPos.topBottom, {transform: translate3d(0, 100 * (1 - shouldExpand * x), 0)}],
                  [wrapperPos.bottomTop, {transform: translate3d(0, -100 * (1 - shouldExpand * x), 0)}]
                ])
                return (
                  <Div
                    className="motion-thumbnail-background"
                    css={{
                      position: shouldExpand ? 'fixed' : 'relative',
                      width: shouldExpand ? tween(x, [
                        [0, px(widthPx)],
                        [1, px(rect.width)]
                      ]) : `${widthPx}px`,
                      height: shouldExpand ? tween(x, [
                        [0, px(heightPx)],
                        [1, px(rect.height)]
                      ]) : `${heightPx}px`,
                      marginLeft: `${offset - offset * shouldExpand * x}%`,
                      borderRadius: `${radius - radius * shouldExpand * x}px`,
                      top: `${shouldExpand ? (posTopTop - scrollY) * (1 - x) : marginTop}px`,
                      borderWidth: `${shouldExpand ? 2 * (1 - x) : 2}px`,
                      zIndex: `${shouldExpand ? 1 : 0}`,
                      '::before': {
                        backgroundImage: `url(${image})`,
                        ...translateTween
                      },
                    }}>
                    <div
                      className="motion-thumbnail-foreground"
                      onClick={this.handleClick} />
                  </Div>
                )
              }
              }</Track>
          }</TrackDocument>
        }
      </Motion>
    )
  }
}

MotionThumbnail.prototypes = {
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  imageTransform: PropTypes.object,
  wrapperPos: PropTypes.object,
  offset: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.oneOf(utils.shapes)
}

MotionThumbnail.defaultProps = {
  offset: 30,
  width: 40,
  shape: 'circle'
}

export default MotionThumbnail
