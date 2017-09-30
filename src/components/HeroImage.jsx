import React from 'react'
import PropTypes from 'prop-types'

const HeroImage = ({
  image,
  backgroundFixed,
  top,
  bottom,
  left,
  right,
  borderWidth,
  position,
  onClick,
}) => {
  const { heroImageBase64, heroImageSrc } = image
  return (
    <div
      className="hero-image"
      style={{
        position,
        top: `${top}%`,
        bottom: `${bottom}%`,
        left: `${left}%`,
        right: `${right}%`,
        borderWidth: `${borderWidth}px`,
        cursor: onClick ? 'pointer' : 'auto',
      }}
      css={{
        '::before': {
          backgroundImage: `url(${heroImageBase64})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll',
        },
        '::after': {
          backgroundImage: `url(${heroImageSrc})`,
          backgroundAttachment: backgroundFixed ? 'fixed' : 'scroll',
        },
      }}
      onClick={onClick || null}
      role={'link'}
      tabIndex={0}
    />
  )
}

HeroImage.propTypes = {
  image: PropTypes.object.isRequired, // eslint-disable-line
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
  onClick: undefined,
}


export default HeroImage
