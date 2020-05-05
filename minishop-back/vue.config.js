const path = require('path')

const defaultSettings = require('./src/settings.js')

const webName = defaultSettings.title || "MiniShop 后台"

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
    name:webName,
    resolve: {
     		alias: {
       		'@': resolve('src')
     		}
    }
  },
  productionSourceMap: false,
  publicPath:'/'
}