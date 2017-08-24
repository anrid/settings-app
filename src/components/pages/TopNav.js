/** @jsx Inferno */
import Inferno from 'inferno'
import { connect } from 'inferno-redux'
import TopNavMenu from '../misc/TopNavMenu'
import './TopNav.css'

const TopNav = ({ session }) => (
  <div className='TopNav'>
    <div className='TopNav__Inner'>
      <div className='TopNav__Section TopNav__Section--Left'>
        <div className='TopNav__Search'>
          <i className='typcn typcn-zoom-outline' />
          <input type='text' placeholder='Search Fancy' />
        </div>
      </div>
      <div className='TopNav__Section TopNav__Section--Center'>
        <div className='TopNav__Logo' />
      </div>
      <div className='TopNav__Section TopNav__Section--Right'>
        <div className='TopNav__Menu'>
          <div className='TopNav__MenuItem'><i className='typcn typcn-shopping-cart' /></div>
          <div className='TopNav__MenuItem'><i className='typcn typcn-folder-open' /></div>
          <div className='TopNav__MenuItem'><i className='typcn typcn-flash-outline' /></div>
          <div className='TopNav__MenuItem'><TopNavMenu /></div>
        </div>
      </div>
    </div>
  </div>
)

export default connect(({ session }) => ({ session }))(TopNav)
