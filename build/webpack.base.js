const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 抽离css
const chalk = require('chalk')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBar = require('webpackbar') // webpack编译显示的进度条

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

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
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/, // 不处理node_modules
      //   include: [resolve('src')],
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: true,
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // 不处理node_modules
        include: [resolve('src')],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx', // 不用jsx语法不用写
              target: 'es2015'
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // 包含 autoprefixer，加浏览器前缀
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
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
        generator: {
          filename: 'img/[name][ext]?t=[hash:8]'
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
    extensions: ['.js', '.jsx', '.json'], // 引入模块时可以不写后缀
    alias: {
      "@": path.resolve(__dirname, "./src") // 路径别名
    }
  },
  stats: 'errors-only'
}