'use strict'

const Errors = require('restify-errors')
const Joi = require('joi')

function validateOrFail (data, schema) {
  const result = Joi.validate(data || { }, schema, { stripUnknown: true, presence: 'required' })
  if (result.error) {
    console.error('Error:', result.error)
    console.error('Bad payload:', data)
    throw new Errors.InvalidArgumentError(result.error.message)
  }
  return result.value
}

function requireSession (req) {
  if (!req.userId || !req.email) throw new Errors.UnauthorizedError('No session')
}

function createEndpoint (endpoint) {
  return async function (req, res, next) {
    try {
      await endpoint(req, res, next)
    } catch (err) {
      console.error('Endpoint error:', err)
      if (err instanceof Errors.HttpError || err instanceof Errors.RestError) {
        next(err)
      } else {
        next(new Errors.InternalServerError(err.message))
      }
    }
  }
}

module.exports = {
  validateOrFail,
  requireSession,
  createEndpoint
}
