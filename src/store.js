'use strict'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// ============================================================
// App state.
// ============================================================

const INITIAL_STATE = {
  session: null,
  preferences: {
    language: 'en',
    timezone: 'Asia/Seoul',
    currency: 'KRW',
    profileVisibility: 'everyone'
  },
  loading: false,
  apiError: null,
  popupMenu: null
}

function rootReducer (state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload }

    case 'MERGE_MAP':
      return mergeMap(state, action.payload)
  }
  return state
}

function mergeMap (state, payload) {
  const n = { ...state }
  Object.keys(payload).forEach(key => {
    n[key] = { ...n[key], ...payload[key] }
  })
  return n
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store
