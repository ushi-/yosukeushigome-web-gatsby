import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import {TrackDocument, Track} from 'react-track'
import {topTop, calculateScrollY, getDocumentRect} from
    'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import {scale, px, translate3d} from 'react-imation/tween-value-factories'
import classnames from 'classnames'

import HeroImage from '../components/heroImage'

class HeroImageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedImageIndex: -1,
    }
  }
  handleClick = index => {
    this.setState({
      clickedImageIndex: index,
    })
    this.props.onClick()
  }
  render() {
    const { image, isMobile, onClick, shouldHide, onAnimationRest, head,
        body, foot } = this.props
    const { clickedImageIndex } = this.state
    return (
      <Motion
        style={{x: spring(shouldExpand || shouldHide ? 1 : 0)}}
        onRest={onAnimationRest}
      >
        {({ x }) =>
        <TrackDocument
          formulas={[ topTop, calculateScrollY, getDocumentRect ]}
        >
          {( topTop, scrollY, rect ) =>
          <Track
            component="section"
            formulas={[ topTop ]}
          >
            {( Section, posTopTop ) => {
            const topOffset = shouldExpand ? (posTopTop - scrollY) * (1 - x) : 0
            const bottomOffset = -topOffset
            return (
              <Section
                className={classnames(
                  "hero",
                  "is-fullheight",
                  {
                    "hide": shouldHide,
                  }
                )}
              >
                <HeroImage
                  image={image}
                  backgroundFixed={false}
                  fixed={false}
                  onClick={() => this.handleClick(0)}
                />
                <div className="hero-head">
                  {head || null}
                </div>
                <div className="hero-body">
                  {body || null}
                </div>
                <div className="hero-foot">
                  {foot || null}
                </div>
              </Section>
            )}}
          </Track>
          }
        </TrackDocument>
        }
      </Motion>
    )
  }
}

HeroImageContainer.propTypes = {
  image: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func,
  shouldHide: PropTypes.bool,
  onAnimationRest: PropTypes.func,
  head: PropTypes.element,
  body: PropTypes.element,
  foot: PropTypes.element,
}

HeroImageContainer.defaultProps = {
  shouldHide: false,
}

export default HeroImageContainer
