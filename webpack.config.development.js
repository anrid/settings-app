'use strict'

const Webpack = require('webpack')
const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9090'
console.log('Using back-end URL:', BACKEND_URL)

module.exports = env => {
  return {
    entry: {
      main: Path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
      filename: '[name].[hash].js',
      path: Path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        babelLoaderRules(),
        postCssLoaderRules()
      ]
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Settings App',
        template: Path.join(__dirname, 'src', 'index.ejs'),
        BACKEND_URL
      })
    ],
    devServer: devServerConfig(),
    devtool: 'source-map',
    resolve: {
      alias: {
        'react': 'inferno-compat',
        'react-dom': 'inferno-compat'
      }
    }
  }
}

function devServerConfig () {
  return {
    contentBase: Path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true
  }
}

function babelLoaderRules () {
  return {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader'
    }
  }
}

function postCssLoaderRules () {
  return {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      'postcss-loader'
    ]
  }
}
