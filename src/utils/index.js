module.exports = {
  shapes: ['horizontal', 'bar', 'portrait'],
  randomBetween: (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
  },
}
