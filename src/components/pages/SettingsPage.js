/** @jsx Inferno */
import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import TopNav from './TopNav'
import SideBar from '../misc/SideBar'
import Preferences from '../misc/Preferences'
import LoadingPage from '../misc/LoadingPage'
import { getPreferences } from '../../actions'
import './SettingsPage.css'

class SettingsPage extends Component {
  componentWillMount () {
    this.props.dispatch(getPreferences())
  }

  render ({ loading }) {
    if (loading) return <LoadingPage message='Loading settings ..' />

    return (
      <div className='SettingsPage'>
        <TopNav />
        <section className='SettingsPage__Main'>
          <SideBar />
          <Preferences />
        </section>
      </div>
    )
  }
}

export default connect(({ loading }) => ({ loading }))(SettingsPage)
