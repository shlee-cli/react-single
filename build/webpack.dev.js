const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const fs = require('fs')
const path = require('path')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  devServer: {
    open: false, // 自动打开浏览器
    hot: true, // 启动热更新
    port: 8080, // 监听请求的端口号
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.post("/api/*", function (req, res) {
        let reqPath = req.path.toLowerCase()
        fs.readFile(path.resolve(__dirname, `../mockdata/${reqPath}.json`), (err, data) => {
          if(err){
            console.log(err);
          }else{
            res.json(JSON.parse(data));
          }
        })
      })
    },
  }
})