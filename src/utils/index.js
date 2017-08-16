module.exports = {
  shapes: ['horizontal', 'bar', 'portrait', 'circle'],
  randomBetween: (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  motionThumbnailProps: [
    [
      {
        offset: 40,
        width: 50,
        shape: 'circle'
      },
      {
        offset: 10,
        width: 70,
        shape: 'bar'
      },
    ],
    [
      {
        offset: 10,
        width: 60,
        shape: 'horizontal'
      },
      {
        offset: 50,
        width: 40,
        shape: 'portrait'
      },
    ],
  ]
}
