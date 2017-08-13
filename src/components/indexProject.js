import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TrackDocument, Track} from 'react-track'
import {topBottom, bottomTop, calculateScrollY} from 'react-track/tracking-formulas'

import IndexProjectHeader from '../components/indexProjectHeader'
import MotionThumbnail from '../components/motionThumbnail'

class IndexProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { project, thumbnailParams, containerOriginY } = this.props
    const { featuredImageUrl, slug } = project.fields
    const vh = 100 / thumbnailParams.length
    return (
      <TrackDocument formulas={[topBottom, bottomTop, calculateScrollY]}>
      {(topBottom, bottomTop, scrollY) =>
        <Track component="div" formulas={[topBottom, bottomTop]}>
        {(Div, posTopBottom, posBottomTop) =>
          <Div>
            <IndexProjectHeader
              project={project}
              containerOriginY={containerOriginY} />
            {thumbnailParams.map((param, i) =>
              <div
                key={i}
                className="columns is-desktop motion-thumbnail-wrapper"
                style={{height: `${vh}vh`}}>
                <MotionThumbnail
                  image={featuredImageUrl}
                  slug={slug}
                  height={vh}
                  width={param.width}
                  shape={param.shape}
                  offset={param.offset}
                  wrapperPos={{
                    topBottom: posTopBottom,
                    bottomTop: posBottomTop
                  }} />
              </div>
            )}
          </Div>
        }</Track>
      }</TrackDocument>
    )
  }
}

IndexProject.propTypes = {
  project: PropTypes.object,
  thumbnailParams: PropTypes.object,
  containerOriginY: PropTypes.number
}

export default IndexProject
