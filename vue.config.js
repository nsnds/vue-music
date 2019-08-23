const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
      .set('common', resolve('src/common'))
  }
}
