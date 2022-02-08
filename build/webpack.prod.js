const TerserPlugin = require("terser-webpack-plugin") // 压缩js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin") // 压缩css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包体积分析
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false // 不将注释提取到单独的文件中
      }),
      new CssMinimizerPlugin({
        parallel: 4
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        'react': {
          test: /[\\/]react(.+?)[\\/]/,
          name: "react",
          priority: 5,
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})
