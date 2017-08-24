'use strict'

const Errors = require('restify-errors')
const Joi = require('joi')
const { validateOrFail, createEndpoint } = require('./util')
const { createToken } = require('./auth')
const User = require('./data/user')

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
})

async function signupOrSignin (req, res, next) {
  const data = validateOrFail(req.body, schema)
  const user = await User.getUserByEmail(data.email)
  if (user) {
    await performSignin(data, user, res, next)
  } else {
    await performSignup(data, res, next)
  }
}

async function performSignin (data, user, res, next) {
  const passwordHash = User.createPassword(data.password, user.passwordSalt)
  if (user.passwordHash !== passwordHash) {
    next(new Errors.UnauthorizedError('Invalid email or password'))
    return
  }

  console.log(`Signed in existing user: ${user.email} (${user._id}) — Last signed in: ${user.lastLogin}`)
  const updatedUser = await User.updateUser(user._id, { lastLogin: new Date() })
  sendProfileAndToken(updatedUser, res)
  next()
}

async function performSignup (data, res, next) {
  const user = await User.createUser(data)
  console.log(`Signed up new user: ${user.email} (${user._id})`)
  sendProfileAndToken(user, res)
  next()
}

function sendProfileAndToken (user, res) {
  const profile = {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    lastSeen: user.lastLogin || null
  }
  const accessToken = createToken(profile)
  res.send({ profile, accessToken })
}

// Setup routes.
module.exports = function (server) {
  server.post('/signup', createEndpoint(signupOrSignin))
}
