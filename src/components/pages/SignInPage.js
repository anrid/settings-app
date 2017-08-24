/** @jsx Inferno */
import Inferno, { linkEvent } from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import { signUp } from '../../actions'

import './SignInPage.css'

function handleInput (instance, e) {
  instance.setState({ [e.target.name]: e.target.value })
}

class SignInPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'ace.base@example.com',
      password: '12345678'
    }
  }

  render () {
    const { signUp, apiError } = this.props
    const { email, password } = this.state
    return (
      <div className='SignInPage'>
        <div className='SignInPage__Title'>
          Welcome to the Settings App.
        </div>
        {apiError && (
          <div className='SignInPage__Error'>{apiError}</div>
        )}
        <div className='SignInPage__Box'>
          <div className='SignInPage__Field'>
            <input name='email' type='email' placeholder='Email Address ..'
              value={email}
              onInput={linkEvent(this, handleInput)}
            />
          </div>
          <div className='SignInPage__Field'>
            <input name='password' type='password' placeholder='Password ..'
              value={password}
              onInput={linkEvent(this, handleInput)}
            />
          </div>
          <button className='SignInPage__Button' onClick={() => signUp(email, password)}>
            Sign In
          </button>
        </div>
      </div>
    )
  }
}

export default connect(({ apiError }) => ({ apiError }), { signUp })(SignInPage)
