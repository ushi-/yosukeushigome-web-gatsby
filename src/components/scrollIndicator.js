import React, { PropTypes, Component } from 'react'
import {TrackDocument, Track} from 'react-track'
import {calculateScrollY} from 'react-track/tracking-formulas'
import {tween} from 'react-imation'
import { Motion, spring, presets } from "react-motion"
import {translate3d} from 'react-imation/tween-value-factories'

class ScrollIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forward: true,
      numRepeats: 0
    }
  }
  handleRest = () => {
    if (this.props.maxNumRepeats == -1 ||
      this.state.numRepeats + 1 <= this.props.maxNumRepeats ||
      true) {
      setTimeout(() => {
        this.setState({
          forward: !this.state.forward,
          numRepeats: this.state.numRepeats + 1
        })
      }, 1)
    }
  }
  render() {
    const { maxNumRepeats } = this.props
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
            <div
              className="scroll-indicator"
              style={{
              transform: `translateY(${x/2}rem)`,
              display: scrollY > 300 ? 'none' : 'inherit',
              ...opacityTween
            }}>
              <span className="icon is-large">
                <i className="fa fa-angle-down"></i>
              </span>
            </div>
          )}
        }</TrackDocument>
      }</Motion>
    )
  }
}

ScrollIndicator.propTypes = {
  maxNumRepeats: PropTypes.number
}

ScrollIndicator.defaultProps = {
  maxNumRepeats: 5
}

export default ScrollIndicator
