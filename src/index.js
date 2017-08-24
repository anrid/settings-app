/** @jsx Inferno */
import 'babel-polyfill'
import Inferno from 'inferno'

import * as actions from './actions'
import store from './store'

// Global CSS.
import './css/index.css'

import App from './components/App'

// Restore saved credentials.
store.dispatch(actions.restoreSession())
console.log('[app] App state:', store.getState())

Inferno.render(<App />, document.getElementById('app'))
