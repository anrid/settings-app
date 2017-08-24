'use strict'

const test = require('tape')
const request = require('supertest')
const server = require('./index')
const Mongo = require('./mongodb')

test('Setup tests', async t => {
  const db = await Mongo.connect('mongodb://localhost/settings_app_test')
  let r = await db.collection('users').deleteMany({ })
  console.log(`Deleted ${r.result.n} rows.`)
  t.end()
})

const _user = {

}
test('Signup fails with bad data', t => {
  request(server)
    .post('/signup')
    .field('email', 'ace@base.se')
    .field('password', '123456')
    .expect('Content-Type', /json/)
    .expect(409)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.code, 'InvalidArgument', 'should have InvalidArgument error code')
      t.ok(res.body.message.includes('password'), 'should fail because something’s wrong with the password')
      t.end()
    })
})

test('Signup', t => {
  request(server)
    .post('/signup')
    .field('email', 'ace@base.se')
    .field('password', '12345678')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.profile.email, 'ace@base.se', 'should have correct email address')
      t.equal(res.body.profile.lastSeen, null, 'should never have been seen before')
      t.ok(res.body.accessToken.length > 40, 'should have an access token')
      t.end()
    })
})

test('Signin happens when an email and password is the same as a signed up user', async t => {
  request(server)
    .post('/signup')
    .field('email', 'ace@base.se')
    .field('password', '12345678')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.profile.email, 'ace@base.se', 'should have correct email address')
      t.ok(res.body.profile.lastSeen, 'should have been seen before')
      _user.accessToken = res.body.accessToken
      t.end()
    })
})

test('Signin fails with wrong password', async t => {
  request(server)
    .post('/signup')
    .field('email', 'ace@base.se')
    .field('password', '1234567890')
    .expect('Content-Type', /json/)
    .expect(401)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.code, 'Unauthorized', 'should have Unauthorized error code')
      t.ok(res.body.message.includes('Invalid email or password'), 'should fail to login because the password is wrong')
      t.end()
    })
})

test('Get preferences', async t => {
  request(server)
    .get('/preferences')
    .set('Authorization', 'Bearer ' + _user.accessToken)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.preferences.language, 'en', 'should have default langauge set to "en" (English)')
      t.end()
    })
})

test('Save language preference', async t => {
  request(server)
    .put('/preferences')
    .field('language', 'se')
    .set('Authorization', 'Bearer ' + _user.accessToken)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.preferences.language, 'se', 'should set language to "se" (Swedish)')
      t.end()
    })
})

test('Save timezone preference', async t => {
  request(server)
    .put('/preferences')
    .field('timezone', 'Asia/Ulaanbaatar')
    .set('Authorization', 'Bearer ' + _user.accessToken)
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should not produce an error')
      t.equal(res.body.preferences.language, 'se', 'should still have language set to "se" (Swedish)')
      t.equal(res.body.preferences.timezone, 'Asia/Ulaanbaatar', 'should set timezone to Asia/Ulaanbaatar')
      t.end()
    })
})

test.onFinish(() => {
  Mongo.close()
})
