var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')
var px2rem = require('postcss-px2rem');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const originalConfig = {
  entry: {
    app: './src/main.js'
      },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
     extensions: ['.js','.json','.vue', '.less', '.css', '.scss'],
     alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
      'vux-components': 'vux/src/components/',
      'taskmgmtcomponents': path.resolve(__dirname, '../src/taskmgmt/components'),
     }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [{
    name: 'vux-ui'
  },{
    name: 'progress-bar'
  },{
      name: 'less-theme',
      path: 'src/style/theme.less'
  }]
})