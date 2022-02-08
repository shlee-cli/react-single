const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

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
        type: "asset/inline",
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
    new ProgressBarPlugin({
      format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // 路径别名
    }
  }
}