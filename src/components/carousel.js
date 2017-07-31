import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Iframe from 'react-iframe'

import YouTubeGetID from '../utils/youtubeID'
import vimeoGetID from '../utils/vimeoID'

const Carousel = ({ urls }) => {
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
      <div key={i} className="carousel-element"
        style={isVideo ? "" : {
        backgroundImage: `url(${url})`,
      }}>
        {isVideo ? (
          <Iframe url={videoUrl}
                      position="relative"
                      display="block"
                      width="100%"
                      allowFullScreen/>
        ) : ""}
      </div>
    )
  })
  const settings = {
    accessibility: true,
    // adaptiveHeight: true,
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
  urls: PropTypes.array
}

export default Carousel
