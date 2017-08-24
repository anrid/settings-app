/* globals fetch */
'use strict'

import Cookie from 'js-cookie'
import history from './lib/history'

const setData = payload => ({ type: 'SET_DATA', payload })
const mergeMap = payload => ({ type: 'MERGE_MAP', payload })

export const restoreSession = () => dispatch => {
  const session = Cookie.getJSON('settings')
  if (session) {
    try {
      console.log('Restored saved session:', session.profile.email)
      dispatch(setData({ session }))
    } catch (err) {
      dispatch(signOut())
    }
  }
}

export const signOut = () => (dispatch, getState) => {
  Cookie.remove('settings')
  history.push('/')
  dispatch(setData({ session: null }))
}

export const createSession = session => (dispatch, getState) => {
  dispatch(setData({ session }))
  Cookie.set('settings', session, { expires: 7 })
}

export const signUp = (email, password) => async (dispatch, getState) => {
  const data = await apiCall('POST', '/signup', { email, password }, dispatch, getState)
  if (data === false) return
  dispatch(createSession(data))
  history.push('/settings')
}

export const showPopupMenu = forId => dispatch => {
  dispatch(setData({ popupMenu: forId }))
}

export const setPreference = (name, value) => async (dispatch, getState) => {
  dispatch(mergeMap({ preferences: { [name]: value } }))
  apiCall('PUT', '/preferences', { [name]: value }, dispatch, getState)
}

export const getPreferences = () => async (dispatch, getState) => {
  dispatch(setData({ loading: true }))
  const { preferences } = await apiCall('GET', '/preferences', null, dispatch, getState)
  dispatch(setData({ preferences, loading: false }))
}

async function apiCall (method, endpoint, payload, dispatch, getState) {
  const { session } = getState()
  const accessToken = session && session.accessToken
  dispatch(setData({ apiError: null }))

  const data = await _apiCall(method, endpoint, payload, accessToken)
  if (!data) {
    dispatch(setData({ apiError: 'Server Error: See console for more.' }))
    return false
  }
  if (data.code && data.message) {
    dispatch(setData({ apiError: `${data.code}: ${data.message}`, loading: false }))
    return false
  }
  return data
}

function _apiCall (method, endpoint, payload, token = false) {
  const opts = {
    method,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }
  if (payload) {
    opts.body = JSON.stringify(payload)
  }
  if (token) {
    opts.headers['Authorization'] = `Bearer ${token}`
  }
  return fetch(window.Config.BACKEND_URL + endpoint, opts)
  .then(result => result.json())
  .catch(err => {
    console.error(`[api] Error:`, err)
  })
}
