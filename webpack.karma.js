// Dynamically find test files in src folder
require('babel-polyfill')
const context = require.context('./src', true, /\.spec\.js$/)
context.keys().forEach(context)
