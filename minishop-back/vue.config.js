const path = require('path')

const defaultSettings = require('./src/settings.js')

const webName = defaultSettings.title || "MiniShop 后台"

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // css:{
  //   loaderOptions:{
  //     sass:{
  //       prependData:`
  //         @import "@/assets/style/mixin.scss";
  //         @import "@/assets/style/theme.scss";
  //       `
  //     }
  //   }
  // },
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