module.exports = {
  plugins: [
    require('autoprefixer'), // 添加厂商前缀
    require('cssnano')({ // 压缩css
      preset: 'default'
    }),
    require('postcss-plugin-px2rem')({
      rootValue: 18.75,
      minPixelValue: 1.01
    })
  ]
}
