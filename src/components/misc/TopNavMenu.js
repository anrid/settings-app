/** @jsx Inferno */
import Inferno from 'inferno'
import { connect } from 'inferno-redux'
import PopupMenu from './PopupMenu'
import { signOut } from '../../actions'
import './TopNavMenu.css'

const items = [
  { _id: 'signout', name: 'Sign Out' }
]

function onSelect ({ signOut }, item) {
  switch (item._id) {
    case 'signout':
      return signOut()
    default:
      console.log('Unhandled menu select for item:', item)
  }
}

const TopNavMenuHeader = ({ session }) => (
  <div className='TopNavMenu__Header'>
    <div className='TopNavMenu__Header__Avatar'>
      <div style={{ backgroundImage: 'url(https://s-media-cache-ak0.pinimg.com/564x/1c/5b/a9/1c5ba9580eda922552dc7f19d4bbf0ef.jpg)' }} />
    </div>
    <div className='TopNavMenu__Header__Info'>
      <div className='TopNavMenu__Header__Name'>
        { session.profile.firstName } { session.profile.lastName }
      </div>
      <div className='TopNavMenu__Header__Email'>
        { session.profile.email }
      </div>
    </div>
  </div>
)

const TopNavMenuButton = () => (
  <div>
    <i className='typcn typcn-user-outline' />
    You
    <i className='typcn typcn-arrow-sorted-down' />
  </div>
)

const TopNavMenu = props => (
  <PopupMenu
    forId='topnav'
    items={items}
    onSelect={item => onSelect(props, item)}
    header={<TopNavMenuHeader {...props} />}
    button={<TopNavMenuButton />}
  />
)

export default connect(
  ({ session }) => ({ session }),
  { signOut }
)(TopNavMenu)
