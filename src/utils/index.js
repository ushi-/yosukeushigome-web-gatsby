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
    [
      {
        offset: 25,
        width: 50,
        shape: 'portrait'
      },
    ],
    [
      {
        offset: 10,
        width: 70,
        shape: 'circle'
      },
      {
        offset: 60,
        width: 30,
        shape: 'portrait'
      },
    ],
    [
      {
        offset: 20,
        width: 70,
        shape: 'horizontal'
      },
    ],
    [
      {
        offset: 30,
        width: 60,
        shape: 'bar'
      },
      {
        offset: 10,
        width: 30,
        shape: 'portrait'
      },
    ]
  ]
}
