const Table = require('cli-table2')
process.env.NODE_ENV = 'production'
const fs = require('fs')
const path = require('path')

class myPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('myPlugin', (stats) => {
      let table = new Table({
        head: ['Asset', 'Size', 'Type', 'ChunkName', 'Tip'],
        style: {color: 'yellow'}
      })
      let assets = stats.toJson({
        assetsSort: "field" // 排序
      }).assets
      assets.map(({ name, size, chunkNames }) => {
        let [type = ''] = name.split('/')
        table.push([name, changeUnit(size), type, chunkNames[0], size/1024 > 200 ? 'large' : '']) // 大于200k提示
      })
      // fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(assets));
      console.log(table.toString())

    })
  }
}

const units = ['Byte', 'KB', 'M']
function changeUnit(x) {
  let l = 0, n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024
  }
  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

module.exports = myPlugin