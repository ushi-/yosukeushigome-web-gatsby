import React from 'react'
import PropTypes from 'prop-types'
import { TrackDocument, Track } from 'react-track'
import { topTop, bottomTop, calculateScrollY } from 'react-track/tracking-formulas'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import HeroImageContainer from './HeroImageContainer'

const Project = ({
  isDesktop,
  project,
  heroImageShapes,
  projectsTopTop,
  onSelection,
  selectedProject,
  onSelectionAnimationRest,
}) => {
  const { resolutions } = project.frontmatter.heroImage.childImageSharp
  const image = {
    heroImageBase64: resolutions.base64,
    heroImageSrc: resolutions.src,
    heroImageSrcSet: resolutions.srcSet,
  }
  const anySelected = selectedProject !== undefined
  const thisSelected = anySelected && selectedProject === project
  return (
    <div>
      <TrackDocument formulas={[topTop, bottomTop, calculateScrollY]}>
        {(topTop, bottomTop, scrollY) => (
          <Track component="div" formulas={[topTop, bottomTop]}>
            {(Div, posTopTop, posBottomTop) => {
              const pinned = posTopTop < scrollY + projectsTopTop
              const unpinned = posBottomTop < scrollY + projectsTopTop
              const height = posBottomTop - posTopTop
              const top = unpinned ? height : (pinned ? projectsTopTop : 0)
              return (
                <Div>
                  <ProjectHeaderContainer
                    project={project}
                    hidden={anySelected}
                    pinned={isDesktop && pinned}
                    unpinned={isDesktop && unpinned}
                    top={isDesktop ? top : 0}
                  />
                  <HeroImageContainer
                    isDesktop={isDesktop}
                    image={image}
                    imageShapes={heroImageShapes}
                    isBordered={isDesktop}
                    onClick={onSelection}
                    hidden={anySelected ? !thisSelected : false}
                    onAnimationRest={onSelectionAnimationRest}
                  />
                </Div>
              )
            }}
          </Track>
        )}
      </TrackDocument>
      { isDesktop ? (
        <ProjectHeaderContainer
          project={project}
          hidden
          pinned={false}
          unpinned={false}
          top={0}
        />
      ) : null}
    </div>
  )
}

Project.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired, // eslint-disable-line
  heroImageShapes: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectsTopTop: PropTypes.number.isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedProject: PropTypes.object, // eslint-disable-line
  onSelectionAnimationRest: PropTypes.func.isRequired,
}

export default Project
