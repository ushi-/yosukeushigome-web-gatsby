import React, { Component } from 'react'
import {TrackDocument, Track} from 'react-track'
import {calculateScrollY} from 'react-track/tracking-formulas'
import {tween} from 'react-imation'
import { Motion, spring, presets } from "react-motion"
import {translate3d} from 'react-imation/tween-value-factories'

class ScrollIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forward: true
    }
  }
  handleRest = () => {
    setTimeout(() => {
      this.setState({
        forward: !this.state.forward
      })
    }, 1)
  }
  render() {
    const { forward } = this.state
    return (
      <Motion
        defaultStyle={{x: forward ? 0 : 1}}
        style={{x: spring(forward ? 1 : 0, forward ? presets.noWobble : presets.wobbly)}}
        onRest={this.handleRest}>
      {({ x }) =>
        <TrackDocument formulas={[calculateScrollY]}>
        {(scrollY) => {
          const opacityTween = tween(scrollY, [
            [200, {opacity: 1}],
            [300, {opacity: 0}]
          ])
          return (
            <div className="scroll-indicator" css={{
              transform: `translateY(${x/2}rem)`,
              display: scrollY > 300 ? 'hidden' : 'inherit',
              ...opacityTween
            }}>
              <span className="icon is-medium">
                <i className="fa fa-angle-down"></i>
              </span>
            </div>
          )}
        }</TrackDocument>
      }</Motion>
    )
  }
}

export default ScrollIndicator
