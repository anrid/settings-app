'use strict'

const Webpack = require('webpack')
const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

console.log('Production Build!')

module.exports = env => {
  return {
    entry: {
      main: Path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: Path.resolve(__dirname, 'dist'),
      publicPath: '/app'
    },
    module: {
      rules: [
        babelLoaderRules(),
        postCssLoaderRules()
      ]
    },
    plugins: [
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', // Specify the common bundle's name.
        minChunks: module => {
          // Assuming your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'manifest' // But since there are no more common modules between them
                         // we end up with just the runtime code included in the manifest file
      }),
      new HtmlWebpackPlugin({
        title: 'Settings App',
        template: Path.join(__dirname, 'src', 'index.ejs'),
        BACKEND_URL: process.env.BACKEND_URL
      }),
      new ScriptExtHtmlWebpackPlugin({
        preload: ['manifest', 'vendor', 'main'],
        prefetch: ['manifest', 'vendor', 'main']
      }),
      new ManifestPlugin()
    ],
    devtool: 'source-map',
    resolve: {
      alias: {
        'react': 'inferno-compat',
        'react-dom': 'inferno-compat'
      }
    }
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
