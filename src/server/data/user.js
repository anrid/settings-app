'use strict'

const Shortid = require('shortid')
const Crypto = require('crypto')
const Errors = require('restify-errors')
const { connect } = require('../mongodb')

async function initDb () {
  const db = await connect()
  await db.ensureIndex('users', { email: 1 }, { unique: true, background: true })
}

async function getUserByEmail (email) {
  const db = await connect()
  return db.collection('users').findOne({ email })
}

async function updateUser (userId, update) {
  const db = await connect()
  update.updated = new Date()
  const result = await db.collection('users').findOneAndUpdate(
    { _id: userId },
    { $set: update },
    { returnOriginal: false }
  )
  return result.value
}

async function createUser (data) {
  const db = await connect()

  let [firstName, lastName] = data.email.split('@')[0].split('.')
  lastName = lastName || ''
  firstName = firstName.substr(0, 1).toUpperCase() + firstName.substr(1).toLowerCase()
  lastName = lastName.substr(0, 1).toUpperCase() + lastName.substr(1).toLowerCase()

  const userData = {
    _id: Shortid.generate(),
    firstName,
    lastName,
    email: data.email,
    passwordHash: null,
    passwordSalt: Shortid.generate(),
    preferences: {
      language: 'en',
      timezone: 'Asia/Seoul',
      currency: 'KRW',
      profileVisibility: 'everyone'
    },
    updated: new Date(),
    created: new Date(),
    lastLogin: null
  }

  userData.passwordHash = createPassword(data.password, userData.passwordSalt)

  await db.collection('users').insertOne(userData)
  return userData
}

async function getPreferences (userId) {
  const db = await connect()
  const user = await db.collection('users').findOne({ _id: userId })
  if (!user) throw new Errors.NotFoundError(`No user found for id ${userId}`)
  return user.preferences
}

async function setPreferences (userId, data) {
  const db = await connect()

  const update = Object.keys(data).reduce((acc, x) => {
    acc[`preferences.${x}`] = data[x]
    return acc
  }, { })
  update.updated = new Date()

  const result = await db.collection('users').findOneAndUpdate(
    { _id: userId },
    { $set: update },
    { upsert: true, returnOriginal: false }
  )

  return result.value
}

function createPassword (plainTextPassword, salt) {
  return Crypto.pbkdf2Sync(plainTextPassword, salt, 1000, 512, 'sha512').toString('hex')
}

module.exports = {
  initDb,
  getUserByEmail,
  updateUser,
  createUser,
  createPassword,
  getPreferences,
  setPreferences
}
