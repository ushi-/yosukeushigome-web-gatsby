module.exports = {
  shapes: ['horizontal', 'bar', 'portrait', 'circle'],
  randomBetween: (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
  motionThumbnailProps: [
    [
      {
        offset: 60,
        width: 30,
        shape: 'circle'
      },
      {
        offset: 10,
        width: 60,
        shape: 'bar'
      },
      {
        offset: 50,
        width: 40,
        shape: 'portrait'
      },
    ],
    [
      {
        offset: 10,
        width: 80,
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
