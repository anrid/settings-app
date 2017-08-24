// Karma configuration
module.exports = function (config) {
  config.set({
    // browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ],
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    reporters: [ 'spec' ],
    files: [ 'webpack.karma.js' ],
    preprocessors: {
      // Add webpack as preprocessor
      'webpack.karma.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: require('./webpack.config.development')(),
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
