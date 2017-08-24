/** @jsx Inferno */
import Inferno from 'inferno'
import { Provider } from 'inferno-redux'
import { Router, Route } from 'inferno-router'

import history from '../lib/history'
import store from '../store'

import SettingsPage from './pages/SettingsPage'
import SignInPage from './pages/SignInPage'

function authorizedOnly ({ props, router }) {
  const { session } = store.getState()
  console.log('[router] Path:', history.location.pathname)
  if (!session) {
    router.push('/signin')
  }
}

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route component={SignInPage} path='/signin' />
      <Route component={SettingsPage} path='/settings' onEnter={authorizedOnly} />
      <Route component={SignInPage} path='*' />
    </Router>
  </Provider>
)

export default App
