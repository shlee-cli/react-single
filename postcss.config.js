module.exports = {
  plugins: [
    require('postcss-plugin-px2rem')({
      rootValue: 18.75,
      minPixelValue: 1.01
    })
  ]
}
