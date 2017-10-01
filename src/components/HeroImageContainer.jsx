import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { TrackDocument, TrackedDiv } from 'react-track'
import { calculateScrollY, topTop, bottomBottom }
  from 'react-track/tracking-formulas'
import { tween } from 'react-imation'
import { Motion, spring } from 'react-motion'

import HeroImage from '../components/HeroImage'

class HeroImageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageIndex: undefined,
      windowHeight: '0',
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight })
  }
  handleClick(index) {
    this.setState({ selectedImageIndex: index })
    this.props.onClick()
  }
  handleAnimationRest(index) {
    if (index === this.state.selectedImageIndex) {
      this.props.onAnimationRest()
    }
  }
  render() {
    const {
      isDesktop,
      image,
      imageShapes,
      isBordered,
      onClick,
      hidden,
      head,
      body,
      foot,
    } = this.props
    const { selectedImageIndex, windowHeight } = this.state
    return (
      <TrackDocument
        formulas={[topTop, bottomBottom, calculateScrollY]}
      >
        {(topTop, bottomBottom, scrollY, rect) => (
          <section
            className={classnames(
              'hero',
              'is-fullheight',
              { hide: hidden },
            )}
          >
            {isDesktop ? imageShapes.map((shape, index) => {
              const anySelected = selectedImageIndex >= 0
              const thisSelected =
                anySelected && index === selectedImageIndex
              return (
                <TrackedDiv
                  key={index} // eslint-disable-line
                  formulas={[topTop, bottomBottom]}
                >
                  {(posTopTop, posBottomBottom) => (
                    <Motion
                      style={{ x: spring(anySelected ? 1 : 0) }}
                      onRest={() => this.handleAnimationRest(index)}
                    >
                      {({ x }) => {
                        const scrolledHeightPercent =
                          100 * (posTopTop - scrollY) / windowHeight
                        const fixedTop = shape.top + scrolledHeightPercent
                        const fixedBottom = shape.bottom - scrolledHeightPercent
                        return (
                          <HeroImage
                            image={image}
                            backgroundFixed={isDesktop}
                            top={thisSelected ? fixedTop * (1 - x) : shape.top}
                            bottom={thisSelected ? fixedBottom * (1 - x)
                              : shape.bottom}
                            left={shape.left * (1 - x * thisSelected)}
                            right={shape.right * (1 - x * thisSelected)}
                            borderWidth={isBordered ? 1 : 0}
                            fixed={thisSelected}
                            onClick={onClick ? () => this.handleClick(index)
                              : null}
                          />
                        )
                      }}
                    </Motion>
                  )}
                </TrackedDiv>
              )
            }) : (
              <TrackedDiv formulas={[topTop, bottomBottom]}>
                {(posTopTop, posBottomBottom) => {
                  const selected = selectedImageIndex >= 0
                  const scrolledHeightPercent =
                    100 * (posTopTop - scrollY) / windowHeight
                  return (
                    <Motion
                      style={{ x: spring(selected ? 1 : 0) }}
                      onRest={() => this.handleAnimationRest(0)}
                    >
                      {({ x }) => (
                        <HeroImage
                          image={image}
                          backgroundFixed={isDesktop}
                          top={selected * scrolledHeightPercent * (1 - x)}
                          bottom={selected * scrolledHeightPercent * (x - 1)}
                          borderWidth={isBordered ? 1 : 0}
                          fixed={selected}
                          onClick={onClick ? () => this.handleClick(0) : null}
                        />
                      )}
                    </Motion>
                  )
                }}
              </TrackedDiv>
            )}
            <div className="hero-head"> {head} </div>
            <div className="hero-body"> {body} </div>
            <div className="hero-foot"> {foot} </div>
          </section>
        )}
      </TrackDocument>
    )
  }
}

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
