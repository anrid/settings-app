'use strict'

const Jwt = require('jsonwebtoken')

// NOTE: For testing purposes only.
const INSECURE_SERVER_SECRET = 'some-secret'

function createToken (profile) {
  return Jwt.sign(profile, INSECURE_SERVER_SECRET)
}

function verifyToken (token) {
  return Jwt.verify(token, INSECURE_SERVER_SECRET)
}

function bearerTokenParser (req, res, next) {
  req.authorization = { }
  req.userId = null
  req.email = null
  if (!req.headers.authorization) {
    return next()
  }
  const parts = req.headers.authorization.split(' ', 2)
  req.authorization.scheme = parts[0].toLowerCase()
  req.authorization.token = parts[1]
  if (req.authorization.scheme !== 'bearer') {
    return next()
  }

  let profile
  try {
    profile = verifyToken(req.authorization.token)
  } catch (err) {
    console.error('Verify token error:', err)
    return next()
  }

  console.log(`Identity: ${profile.email} (${profile.userId})`)
  req.userId = profile.userId
  req.email = profile.email
  next()
}

module.exports = {
  createToken,
  verifyToken,
  bearerTokenParser
}
