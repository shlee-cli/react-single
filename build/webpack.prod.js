const TerserPlugin = require("terser-webpack-plugin") // 压缩js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin") // 压缩css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包体积分析
// const { ESBuildMinifyPlugin, ESBuildPlugin } = require('esbuild-loader') // 会导致tree-shaking失效，暂时使用TerserPlugin
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const myPlugin = require('./myPlugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new myPlugin(),
    // new ESBuildPlugin()
  ].concat(process.env.use_analyzer ? new BundleAnalyzerPlugin() : []),
  optimization: {
    // 压缩
    minimizer: [
      new TerserPlugin({
        extractComments: false // 不将注释提取到单独的文件中
      }),
      // new ESBuildMinifyPlugin({
      //   target: 'es2015',
      //   css: true // Apply minification to CSS assets
      // }),
      new CssMinimizerPlugin({
        parallel: 4
      })
    ],
    // runtimeChunk: true, // 进一步拆分入口文件，减少入口文件的体积，但会增加网络请求
    // 拆包
    splitChunks: {
      cacheGroups: {
        // 来自node_modules的第三方模块
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'all',
          enforce: true // 忽略minSize、minChunks、maxAsyncRequests、maxInitialRequests选项，以当前规则去分包
        },
        // // react全家桶单独打包
        // 'react': {
        //   test: /[\\/]react(.+?)[\\/]/,
        //   name: "react",
        //   priority: 15,
        //   chunks: 'initial'
        // }
      }
    }
  }
})
