const path = require('path')
const { name } = require('./package')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 9004

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  // 打包出来的文件 包含有hash信息
  filenameHashing: true,
  publicPath: 'http://localhost:9004',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    disableHostCheck: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      libraryTarget: 'umd',
      filename: 'vue2.js',
      // console 获取 window.vue2
      library: 'vue2',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
