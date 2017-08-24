'use strict'

const Joi = require('joi')
const { validateOrFail, requireSession, createEndpoint } = require('./util')
const User = require('./data/user')

const updateSchema = Joi.object().keys({
  language: Joi.string().regex(/^[a-z-]{2,5}$/).optional(),
  timezone: Joi.string().regex(/^\w+\/\w+$/).optional(),
  currency: Joi.string().regex(/^[A-Z]{3}$/).optional(),
  profileVisibility: Joi.string().allow(['everyone', 'private']).optional()
})
.xor(
  'language',
  'timezone',
  'currency',
  'profileVisibility'
)

/**
 * Get preferences
 * @return  {Object}  Preferences object.
 */
async function getPreferences (req, res, next) {
  requireSession(req)
  const preferences = await User.getPreferences(req.userId)
  res.send(200, { preferences })
  next()
}

/**
 * Update preferences
 * @param   {Object}  req.body  JSON payload matching schema above.
 * @return  {Object}            Preferences object.
 */
async function updatePreferences (req, res, next) {
  requireSession(req)
  const data = validateOrFail(req.body, updateSchema)
  const updatedUser = await User.setPreferences(req.userId, data)
  res.send(200, { preferences: updatedUser.preferences })
  next()
}

// Setup routes.
module.exports = function (server) {
  server.get('/preferences', createEndpoint(getPreferences))
  server.put('/preferences', createEndpoint(updatePreferences))
}
