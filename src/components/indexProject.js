import React, { Component } from 'react'
import PropTypes from 'prop-types'

import IndexProjectHeader from '../components/indexProjectHeader'
import MotionThumbnail from '../components/motionThumbnail'

class IndexProject extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { project, thumbnailParams, containerOriginY, onClick, shouldHide } = this.props
    const { featuredImageBase64, featuredImageSrc, featuredImageSrcSet, slug } = project.fields
    const featuredImage = {
      base64: featuredImageBase64,
      src: featuredImageSrc,
      srcSet: featuredImageSrcSet
    }
    const vh = 100 / thumbnailParams.length
    return (
      <div>
        <IndexProjectHeader
          project={project}
          containerOriginY={containerOriginY}
          shouldHide={shouldHide} />
        {thumbnailParams.map((param, i) =>
          <div
            key={i}
            className="columns is-desktop motion-thumbnail-wrapper"
            style={{height: `${vh}vh`}}>
            <MotionThumbnail
              image={featuredImage}
              slug={slug}
              height={vh}
              width={param.width}
              shape={param.shape}
              offset={param.offset}
              onClick={onClick}
              shouldHide={shouldHide} />
          </div>
        )}
      </div>
    )
  }
}

IndexProject.propTypes = {
  project: PropTypes.object,
  thumbnailParams: PropTypes.array,
  containerOriginY: PropTypes.number,
  onClick: PropTypes.func,
  shouldHide: PropTypes.bool,
}

IndexProject.defaultProps = {
  shouldHide: false
}

export default IndexProject
