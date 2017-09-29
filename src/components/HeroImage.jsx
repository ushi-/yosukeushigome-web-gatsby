import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import {TrackDocument, Track} from 'react-track'
import {topTop, calculateScrollY, getDocumentRect} from
    'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import {scale, px, translate3d} from 'react-imation/tween-value-factories'
import classnames from 'classnames'

const HeroImage = ({
  image,
  backgroundFixed,
  top,
  bottom,
  left,
  right,
  borderWidth,
  position,
  onClick
}) => {
  const { featuredImageBase64, featuredImageSrc, featuredImageSrcSet } = image
  return (
    <div
      className="featured-image"
      style={{
        position: position,
        top: `${top}%`,
        bottom: `${bottom}%`,
        left: `${left}%`,
        right: `${right}%`,
        borderWidth: `${borderWidth}px`,
        cursor: onClick ? 'pointer' : 'auto',
      }}
      css={{
        '::before': {
          backgroundImage: `url(${featuredImageBase64})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll'
        },
        '::after' : {
          backgroundImage: `url(${featuredImageSrc})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll',
        }
      }}
      onClick={onClick || null}
    />
  )
}

HeroImage.propTypes = {
  image: PropTypes.object.isRequired,
  backgroundFixed: PropTypes.bool.isRequired,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  position: PropTypes.string,
  borderWidth: PropTypes.number,
  onClick: PropTypes.func,
}

HeroImage.defaultProps = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  borderWidth: 1,
  position: 'absolute',
}


export default HeroImage
