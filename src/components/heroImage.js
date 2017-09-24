import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import {TrackDocument, Track} from 'react-track'
import {topTop, calculateScrollY, getDocumentRect} from
    'react-track/tracking-formulas'
import {tween, combine} from 'react-imation'
import {scale, px, translate3d} from 'react-imation/tween-value-factories'
import classnames from 'classnames'

const HeroImage = ({ image, backgroundFixed, fixed, onClick }) => {

  const { featuredImageBase64, featuredImageSrc, featuredImageSrcSet } = image
  return (
    <div
      className="featured-image"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        // width: shouldExpand ? tween(x, [
        //   [0, px(widthPx)],
        //   [1, px(rect.width)]
        // ]) : `${widthPx}px`,
        // height: shouldExpand ? tween(x, [
        //   [0, px(heightPx)],
        //   [1, px(rect.height)]
        // ]) : `${heightPx}px`,
        // marginLeft: `${offset - offset * shouldExpand * x}%`,
        // borderRadius: `${radius - radius * shouldExpand * x}px`,
        top: `${topOffset}px`,
        bottom: `${bottomOffset}px`,
        borderWidth: `${shouldExpand ? (1 - x) : 1}px`,
        zIndex: `${shouldExpand ? 1 : 0}`,
      }}
      css={{
        '::before': {
          backgroundImage: `url(${featuredImageBase64})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll'
        },
        '::after' : {
          backgroundImage: `url(${featuredImageSrc})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll',
          cursor: onClick ? 'pointer' : 'auto',
        }
      }}
      onClick={onClick || null}
    />
  )
}

HeroImage.propTypes = {
  image: PropTypes.object.isRequired,
  backgroundFixed: PropTypes.bool,
  fixed: PropTypes.bool,
  onClick: PropTypes.func,
}

HeroImage.defaultProps = {
  fixed: false,
  shouldExpand: false,
  shouldHide: false,
}


export default HeroImage
