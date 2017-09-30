import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import HeroImage from '../components/HeroImage'

const HeroImageContainer = ({
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
}) => (
  <section
    className={classnames(
      'hero',
      'is-fullheight',
      {
        hide: hidden,
      },
    )}
  >
    {isDesktop ? imageShapes.map((shape, i) => (
      <HeroImage
        key={i} // eslint-disable-line
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
    )) : (
      <HeroImage
        image={image}
        backgroundFixed={isDesktop}
        borderWidth={isBordered ? 1 : 0}
        position={'absolute'}
        onClick={onClick}
      />
    )}
    <div className="hero-head"> {head} </div>
    <div className="hero-body"> {body} </div>
    <div className="hero-foot"> {foot} </div>
  </section>
)

HeroImageContainer.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  image: PropTypes.object.isRequired, // eslint-disable-line
  imageShapes: PropTypes.arrayOf(PropTypes.object),
  isBordered: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  onAnimationRest: PropTypes.func,
  head: PropTypes.element,
  body: PropTypes.element,
  foot: PropTypes.element,
}

HeroImageContainer.defaultProps = {
  onClick: undefined,
  hidden: false,
  onAnimationRest: undefined,
  head: undefined,
  body: undefined,
  foot: undefined,
  imageShapes: [{ top: 0, bottom: 0, left: 0, right: 0 }],
}

export default HeroImageContainer
