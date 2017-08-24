/* globals describe, it */

/** @jsx Inferno */
import Inferno from 'inferno'
import Assert from 'assert'
import { render, find } from '../lib/testHelper'
import App from './App'

describe('App smoke test', function () {
  it('renders a simple component correctly', function () {
    const SomeComponent = () => (
      <div className='outer'>
        <div className='innerTitle'>
          Hello
        </div>
        <div className='innerContent'>
          World
        </div>
      </div>
    )
    const tree = render(<SomeComponent />)
    Assert(find(tree).className('outer'), `should find <div className='outer'>`)
    Assert(find(tree).className('innerTitle'), `should find <div className='innerTitle'>`)
    Assert(find(tree).className('innerContent'), `should find <div className='innerContent'>`)
    Assert(find(tree).className('innerContentttt') === false, `should not find a div with a matching className`)
  })

  it('renders <App /> without throwing', function () {
    const tree = render(<App />)
    Assert(find(tree).className('SignInPage'), `should find <div className='SignInPage'>`)
  })
})
