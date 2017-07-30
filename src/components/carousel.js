import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

const Carousel = ({ urls }) => {
  const elements = urls.map((url, i) =>
    <div key={i} style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: "100%",
      height: "56.25vw",
      backgroundColor: "#E7E5E4",
    }}></div>
  )
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
