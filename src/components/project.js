import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectHeaderContainer from '../components/projectHeaderContainer'
import FeaturedImage from '../components/featuredImage'

class Project extends Component {
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
        <ProjectHeaderContainer
          project={project}
          containerOriginY={containerOriginY}
          shouldHide={shouldHide} />
        {thumbnailParams.map((param, i) =>
          <div
            key={i}
            className="columns is-desktop motion-thumbnail-wrapper"
            style={{height: `${vh}vh`}}>
            <FeaturedImage
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

Project.propTypes = {
  project: PropTypes.object,
  thumbnailParams: PropTypes.array,
  containerOriginY: PropTypes.number,
  onClick: PropTypes.func,
  shouldHide: PropTypes.bool,
}

Project.defaultProps = {
  shouldHide: false
}

export default Project
