const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css
const chalk = require('chalk')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar') // webpack编译显示的进度条

// css
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

let entry = {
  'common': ['./src/assets/js/common.js', './src/assets/css/common.less'],
  'app': './src/index.js'
}

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js?t=[contenthash:8]',
    clean: true, // 在生成文件之前清空 output 目录
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      // .css
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader", // 处理@import/require
          "postcss-loader"
        ]
      },
      // .module.css
      {
        test: cssModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              }
            }
          },
          "postcss-loader"
        ]
      },
      // .less
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      // .module.less
      {
        test: lessModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              }
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 大于25kb单独打包
          }
        },
        generator:{ 
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename:'img/[name][ext]?t=[hash:8]',
          // publicPath:'./'
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '/public/index.html'),
      // cdn
      files: {
        js: [],
        css: []
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css?t=[contenthash:8]",
    }),
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false // 不要清空控制台
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // 路径别名
    }
  },
  stats: 'errors-only'
}