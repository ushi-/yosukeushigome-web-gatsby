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
  render() {
    const {
      isDesktop,
      image,
      imageShapes,
      isBordered,
      onClick,
      hidden,
      onAnimationRest,
      head,
      body,
      foot,
    } = this.props
    return (
      <section
        className={classnames(
          "hero",
          "is-fullheight",
          {
            "hide": hidden,
          }
        )}
      >
        {isDesktop ? imageShapes.map((shape, i) =>
          <HeroImage
            key={i}
            image={image}
            backgroundFixed={isDesktop}
            top={shape.top}
            bottom={shape.bottom}
            left={shape.left}
            right={shape.right}
            borderWidth={isBordered ? 1 : 0}
            position={'absolute'}
            onClick={onClick}
          />
        ) : (
          <HeroImage
            image={image}
            backgroundFixed={isDesktop}
            borderWidth={isBordered ? 1 : 0}
            position={'absolute'}
            onClick={onClick}
          />
        )}
        <div className="hero-head"> {head || null} </div>
        <div className="hero-body"> {body || null} </div>
        <div className="hero-foot"> {foot || null} </div>
      </section>
    )
  }
}

HeroImageContainer.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired,
  imageShapes: PropTypes.array,
  isBordered: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  onAnimationRest: PropTypes.func,
  head: PropTypes.element,
  body: PropTypes.element,
  foot: PropTypes.element,
}

HeroImageContainer.defaultProps = {
  hidden: false,
  imageShapes: [{top: 0, bottom: 0, left: 0, right: 0}],
}

export default HeroImageContainer
