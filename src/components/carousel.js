import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Iframe from 'react-iframe'

import YouTubeGetID from '../utils/youtubeID'
import vimeoGetID from '../utils/vimeoID'

const Carousel = ({ urls, className }) => {
  const elements = urls.map((url, i) => {
    const isYoutube = url.includes('youtube')
    const isVimeo = url.includes('vimeo')
    const isVideo = isYoutube || isVimeo
    let videoUrl
    if (isYoutube) {
      videoUrl = "https://www.youtube.com/embed/" + YouTubeGetID(url)
    }
    if (isVimeo) {
      videoUrl = "https://player.vimeo.com/video/" + vimeoGetID(url)
    }
    return (
      <div key={i} className={"carousel-element " + className} >
        {isVideo ? (
          <div className="iframe-wrapper">
            <Iframe url={videoUrl}
                    position="absolute"
                    width="100%"
                    height="100%"
                    styles={{
                      "top": "0",
                      "left": "0"
                    }}
                    allowFullScreen />
          </div>
        ) : (
          <figure className="image">
            <img src={url} />
          </figure>
        )}
      </div>
    )
  })
  const settings = {
    accessibility: true,
    adaptiveHeight: true,
    arrows: urls.length > 1,
    dots: urls.length > 1,
    draggable: urls.length > 1,
    infinite: urls.length > 1,
    lazyLoad: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 400,
  }
  return (
    <Slider {...settings}>
      {elements}
    </Slider>
  )
}

Carousel.propTypes = {
  urls: PropTypes.array,
  className: PropTypes.string
}

export default Carousel
