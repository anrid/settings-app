'use strict'

const MongoClient = require('mongodb').MongoClient

// Connection URL
const URL = 'mongodb://localhost:27017/settings_app'
let _db

function connect (url) {
  if (_db) {
    return Promise.resolve(_db)
  }
  return MongoClient.connect(url || URL)
  .then(db => {
    _db = db
    return db
  })
}

function query (func) {
  return connect().then(func)
}

function close () {
  if (_db) {
    console.log('Closing db.')
    _db.close()
  }
}

module.exports = {
  connect,
  query,
  close
}
