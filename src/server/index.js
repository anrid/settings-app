'use strict'

const Restify = require('restify')
const Errors = require('restify-errors')
const corsMiddleware = require('restify-cors-middleware')
const Auth = require('./auth')

const server = Restify.createServer()

// Middleware.
const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['*'],
  allowHeaders: ['Authorization']
})
server.pre(cors.preflight)
server.use(cors.actual)
server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.gzipResponse())
server.use(Restify.plugins.bodyParser())
server.use(Auth.bearerTokenParser)

// Handle uncaught exceptions & unhandled rejections
server.on('uncaughtException', (req, res, route, err) => {
  console.error('Uncaught exception:', err)
  res.send(new Errors.InternalServerError('Boom!'))
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
})

// Root route acts as a form of sanity test.
server.get('/', (req, res, next) => {
  res.send(`Settings App Server. Time: ${new Date()}`)
  next()
})

// API endpoints.
require('./signup')(server)
require('./preferences')(server)

// Go for glory.
if (require.main === module) {
  server.listen(9090, () => {
    console.log('%s listening at %s', server.name, server.url)
  })
}

module.exports = server
